const express = require("express");
const { mockedVerifyToken } = require("./tests/mocks/auth.mock");
const roomController = require("./src/routes/controllers/room.Controller");

const app = express();

app.use(express.json());

app.get("/api/rooms/new", mockedVerifyToken, roomController.getSongs);
app.post("/api/rooms/new", mockedVerifyToken, roomController.makeRoom);
app.get("/api/rooms/:roomId", mockedVerifyToken, roomController.getBattleData);
app.delete(
  "/api/rooms/:roomId",
  mockedVerifyToken,
  roomController.deleteBattleRoom,
);

module.exports = app;
