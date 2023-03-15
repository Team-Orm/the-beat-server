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
  audioURL: {
    type: String,
  },
  imageURL: {
    type: String,
  },
  artist: {
    type: String,
  },
});

module.exports = mongoose.model("Song", SongSchema);
