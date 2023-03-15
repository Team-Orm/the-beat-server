const app = require("../app");
const http = require("http");
const socketIO = require("socket.io");

const server = http.createServer(app);

server.listen(process.env.PORT || 4000, () => {});

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const lobbyNamespace = io.of("/lobby");
lobbyNamespace.on("connection", (socket) => {
  const currentUser = [];
  const { user, userProfile } = socket.handshake.query;
  currentUser.push({ user: user, userProfile: userProfile });

  socket.on("updateChat", ({ user, content }) => {
    socket.broadcast.emit("chatUpdated", { user, content });
  });

  socket.on("updateCurrentUser", () => {
    socket.broadcast.emit("CurrentUserUpdated", currentUser);
  });

  socket.on("disconnect", () => {
    const disconnectedUser = socket.handshake.query.user;
    const index = currentUser.findIndex(
      (userObj) => userObj.user === disconnectedUser,
    );
    if (index !== -1) {
      currentUser.splice(index, 1);
      io.emit("CurrentUserUpdated", currentUser);
    }
  });
});

const battlesNamespace = io.of(/^\/battles\/(.+)$/);
battlesNamespace.on("connection", (socket) => {
  const roomId = socket.nsp.name.split("/")[2];

  socket.on("updateKey", ({ key }) => {
    io.to(roomId).emit("keyUpdated", key);
  });

  socket.on("disconnect", () => {});
});
