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
  LOBBY_ROOMS,
  BEAT,
  RECEIVE_LOBBY_USERS,
} = require("../constants/eventName");

const server = http.createServer(app);

server.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT || 4000}`);
});

const MongoClient = require("mongodb").MongoClient;
const uri = process.env.SECRET_MONGODB_ID;

const io = socketIO(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST"],
  },
});

const battles = io.of("/battles/");
const battleRooms = {};
const usersInRoom = {};
let lobbyUsers = {};

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

io.on("connection", (socket) => {
  const { displayName, photoURL, uid } = socket.handshake.query;
  socket.join(uid);

  if (!lobbyUsers[uid]) {
    lobbyUsers = {
      ...lobbyUsers,
      [uid]: { displayName, photoURL },
    };
  }

  const convertedRooms = Object.keys(battleRooms).reduce((acc, key) => {
    acc[key] = { users: Array.from(battleRooms[key].users) };
    return acc;
  }, {});

  io.emit(LOBBY_ROOMS, convertedRooms);

  socket.on(RECEIVE_LOBBY_USERS, () => {
    io.emit(LOBBY_ROOMS, convertedRooms);
    io.emit(UPDATE_USER, Object.values(lobbyUsers));
  });

  socket.on(SEND_CHAT, ({ user, chat }) => {
    io.emit(BROADCAST_CHAT, user, chat);
  });

  socket.on("disconnect", () => {
    const { uid } = socket.handshake.query;
    delete lobbyUsers[uid];

    io.emit(UPDATE_USER, Object.values(lobbyUsers));
  });
});

battles.on("connection", (socket) => {
  const { photoURL, displayName, uid, roomId } = socket.handshake.query;
  socket.join(roomId);

  const user = { photoURL, displayName, uid };

  const room = battleRooms[roomId] || { users: new Set() };
  room.users.add(uid);
  battleRooms[roomId] = room;

  if (room.users.size > 2) {
    socket.emit("room-full");
    socket.leave(roomId);
    return;
  }

  const convertedRooms = Object.keys(battleRooms).reduce((acc, key) => {
    acc[key] = { users: Array.from(battleRooms[key].users) };
    return acc;
  }, {});

  if (!usersInRoom[roomId]) {
    usersInRoom[roomId] = [];
  }
  usersInRoom[roomId].push(user);

  socket.on("send-connect", () => {
    io.emit(LOBBY_ROOMS, convertedRooms);
  });

  socket.on("send-user", () => {
    socket.to(roomId).emit("receive-user", usersInRoom[roomId]);
  });

  io.of("/").emit("from-battleroom", convertedRooms);

  socket.on("disconnect", () => {
    const { uid, roomId } = socket.handshake.query;
    room.users.delete(uid);
    battleRooms[roomId] = room;

    usersInRoom[roomId] = usersInRoom[roomId].filter((u) => u.uid !== uid);

    socket.to(roomId).emit("user-left", uid);
    socket.to(roomId).emit("receive-battle", null);
  });
});
