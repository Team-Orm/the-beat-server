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
    maxlength: 10,
  },
  uid: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
});

module.exports = mongoose.model("BattleRoom", BattleRoomSchema);
