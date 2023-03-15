const express = require("express");
const router = express.Router();
const roomController = require("./controllers/room.Controller");

router.get("/", async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

router.get("/new", roomController.getSongs);
router.post("/new", roomController.makeRoom);

router.get("/:roomId", roomController.getSongData);

module.exports = router;
