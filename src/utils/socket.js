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
const battles = io.of(/^\/battles\/.+$/);
const currentUsers = [];

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
  currentUsers.push({ userName, profile, userKey });

  socket.on("send-chat", ({ user, chat }) => {
    io.emit("broadcast-chat", user, chat);
  });

  io.emit("update-user", currentUsers);

  socket.on("disconnect", () => {
    const disconnectedUser = socket.handshake.query.userKey;
    const index = currentUsers.findIndex(
      (userObj) => userObj.userKey === disconnectedUser,
    );

    if (index !== -1) {
      currentUsers.splice(index, 1);
      io.emit("update-user", currentUsers);
    }
  });
});

battles.on("connection", (socket) => {
  const roomId = socket.nsp.name.split("/")[2];

  socket.on("send-data", ({ key, score }) => {
    socket.to(roomId).emit("receive-data", key, score);
  });

  socket.on("disconnect", () => {});
});
