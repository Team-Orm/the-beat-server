const express = require("express");
const router = express.Router();
const roomController = require("./controllers/room.Controller");
const verifyToken = require("./middlewares/verifyToken");

router.get("/", roomController.getRooms);

router.get("/new", verifyToken, roomController.getSongs);
router.post("/new", verifyToken, roomController.makeRoom);

router.get("/:roomId", verifyToken, roomController.getBattleData);

module.exports = router;
