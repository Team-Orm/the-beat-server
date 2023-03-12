const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
  title: {
    type: String,
  },
  audioUrl: {
    type: String,
  },
  artist: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  background: {
    type: String,
  },
});

module.exports = mongoose.model("Song", SongSchema);
