const express = require("express");
const router = express.Router();
const roomController = require("./controllers/room.Controller");

router.get("/", roomController.getRooms);

router.get("/new", roomController.getSongs);
router.post("/new", roomController.makeRoom);

router.get("/:roomId", roomController.getBattleData);

module.exports = router;
