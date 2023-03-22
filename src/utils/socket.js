require("dotenv").config();
const app = require("../app");
const http = require("http");
const socketIO = require("socket.io");
const BattleRoom = require("../models/BattleRoom");
const {
  UPDATE_ROOMS,
  SEND_CHAT,
  BROADCAST_CHAT,
  UPDATE_USER,
  SEND_BATTLES,
  RECEIVE_BATTLES,
  CHECK_USERS,
  USER_LEAVE,
  USER_JOINED,
  BEAT,
} = require("../constants/eventName");

const server = http.createServer(app);

server.listen(process.env.PORT || 4000, () => {});

const MongoClient = require("mongodb").MongoClient;
const uri = process.env.SECRET_MONGODB_ID;

const io = socketIO(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST"],
  },
});

const lobby = io.of("/");
const battles = io.of("/battles/");
let lobbyUsers = {};
const battleCurrentUsers = {};

(async () => {
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db(BEAT);
  const collection = db.collection("battlerooms");

  const changeStream = collection.watch();

  changeStream.on("change", async () => {
    try {
      const rooms = await BattleRoom.find().populate("song");

      io.of("/").emit(UPDATE_ROOMS, rooms);
    } catch (err) {
      next(err);
    }
  });
})();

lobby.on("connection", (socket) => {
  const { displayName, photoURL, uid } = JSON.parse(
    socket.handshake.query.user,
  );

  if (!lobbyUsers[uid]) {
    lobbyUsers = {
      ...lobbyUsers,
      [uid]: { displayName, photoURL },
    };
  }
  io.emit(UPDATE_USER, Object.values(lobbyUsers));
  io.emit(CHECK_USERS, battleCurrentUsers);

  socket.on(SEND_CHAT, ({ user, chat }) => {
    io.emit(BROADCAST_CHAT, user, chat);
  });

  socket.on("disconnect", () => {
    const { uid } = JSON.parse(socket.handshake.query.user);
    delete lobbyUsers[uid];

    io.emit(UPDATE_USER, Object.values(lobbyUsers));
  });
});

battles.on("connection", (socket) => {
  const { displayName, picture, uid, roomId } = socket.handshake.query;
  const user = { displayName, picture, uid, roomId };

  socket.join(roomId);

  const usersInRoom = { ...battleCurrentUsers[roomId], [uid]: user };
  const updatedBattleCurrentUsers = {
    ...battleCurrentUsers,
    [roomId]: usersInRoom,
  };

  socket.on(USER_JOINED, (id, displayName) => {
    if (!id) {
      return;
    }

    socket.to(roomId).emit(UPDATE_USER, displayName);
  });

  socket.emit(UPDATE_USER, Object.values(usersInRoom));

  socket.on(SEND_BATTLES, ({ key, score }) => {
    socket.to(roomId).emit(RECEIVE_BATTLES, key, score);
  });

  socket.on("disconnect", () => {
    const { uid } = socket.handshake.query;
    delete usersInRoom[uid];

    if (Object.keys(usersInRoom).length === 0) {
      delete updatedBattleCurrentUsers[roomId];
    } else {
      updatedBattleCurrentUsers[roomId] = usersInRoom;
    }
    socket.in(roomId).emit(USER_LEAVE, user);
    io.of("/").emit(CHECK_USERS, updatedBattleCurrentUsers);
    io.emit(UPDATE_USER, Object.values(usersInRoom));
  });
});
