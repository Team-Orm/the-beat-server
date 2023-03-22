const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  note: [
    {
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
    },
  ],
});

module.exports = mongoose.model("Note", NoteSchema);
