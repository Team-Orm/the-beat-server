const app = require("../app");
const http = require("http");
const socketIO = require("socket.io");

const server = http.createServer(app);
server.listen(process.env.PORT || 4000, () => {});

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const lobby = io.of("/");
const battles = io.of(/^\/battles\/.+$/);

lobby.on("connection", (socket) => {
  const currentUser = [];
  const { user } = socket.handshake.query;
  currentUser.push({ user });

  socket.on("send-chat", ({ user, chat }) => {
    io.broadcast.emit("broadcast-chat", user, chat);
  });

  socket.on("send-user", () => {
    io.broadcast.emit("update-user", currentUser);
  });

  socket.on("disconnect", () => {
    const disconnectedUser = socket.handshake.query.user;
    const index = currentUser.findIndex(
      (userObj) => userObj.user === disconnectedUser,
    );

    if (index !== -1) {
      currentUser.splice(index, 1);
      io.emit("update-user", currentUser);
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
