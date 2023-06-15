const mongoose = require("mongoose");

const BattleRoomSchema = new mongoose.Schema({
  song: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song",
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 20,
  },
  uid: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  mode: {
    type: String,
  },
});

module.exports = mongoose.model("BattleRoom", BattleRoomSchema);
