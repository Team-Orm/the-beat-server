const app = require("../app");
const http = require("http");
const socketIO = require("socket.io");
const Battleroom = require("../models/BattleRoom");

const server = http.createServer(app);

server.listen(process.env.PORT || 4000, () => {});

const MongoClient = require("mongodb").MongoClient;
const uri = process.env.SECRET_mongodbID;

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
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

  const db = client.db("test");
  const collection = db.collection("battlerooms");

  const changeStream = collection.watch();

  changeStream.on("change", async () => {
    try {
      const rooms = await Battleroom.find();
      io.of("/").emit("update-rooms", rooms);
    } catch (err) {
      next(err);
    }
  });
})();

lobby.on("connection", (socket) => {
  const { userName, profile, userKey } = socket.handshake.query;
  currentUsers[userKey] = { userName, profile, userKey };
  console.log(Object.values(currentUsers));

  socket.on("send-chat", ({ user, chat }) => {
    io.emit("broadcast-chat", user, chat);
  });

  io.emit("update-user", Object.values(currentUsers));

  socket.on("disconnect", () => {
    const disconnectedUser = socket.handshake.query.userKey;
    delete currentUsers[disconnectedUser]; // Remove user from object

    io.emit("update-user", Object.values(currentUsers));
  });
});

battles.on("connection", (socket) => {
  const { roomId } = socket.handshake.query;

  if (roomId) {
    socket.join(roomId);

    socket.on("send-data", ({ key, score }) => {
      socket.to(roomId).emit("receive-data", key, score);
    });

    socket.on("disconnect", () => {});
  }
});
