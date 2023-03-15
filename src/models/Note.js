const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  time: {
    type: Number,
  },
  key: {
    type: String,
  },
  positionY: {
    type: Number,
  },
  hit: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Note", NoteSchema);
