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
const currentUsers = {};

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
  const { name, picture, uid } = socket.handshake.query;
  currentUsers[uid] = { name, picture, uid };

  socket.on(SEND_CHAT, ({ user, chat }) => {
    io.emit(BROADCAST_CHAT, user, chat);
  });

  io.emit(UPDATE_USER, Object.values(currentUsers));

  socket.on("disconnect", () => {
    const { uid } = socket.handshake.query;
    delete currentUsers[uid];

    io.emit(UPDATE_USER, Object.values(currentUsers));
  });
});

battles.on("connection", (socket) => {
  const { roomId } = socket.handshake.query;

  if (roomId) {
    socket.join(roomId);

    socket.on(SEND_BATTLES, ({ key, score }) => {
      socket.to(roomId).emit(RECEIVE_BATTLES, key, score);
    });

    socket.on("disconnect", () => {});
  }
});
