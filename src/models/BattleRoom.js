const mongoose = require("mongoose");

const BattleRoomSchema = new mongoose.Schema({
  song: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song",
  },
  createdBy: {
    type: String,
  },
  email: {
    type: String,
  },
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("BattleRoom", BattleRoomSchema);
