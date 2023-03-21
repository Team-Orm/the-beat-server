const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song",
    required: true,
  },
  time: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  key: {
    type: String,
    required: true,
  },
  positionY: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
});

module.exports = mongoose.model("Note", NoteSchema);
