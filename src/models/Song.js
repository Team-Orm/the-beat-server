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
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 20,
  },
  audioURL: {
    type: String,
    required: true,
    trim: true,
  },
  imageURL: {
    type: String,
    required: true,
    trim: true,
  },
  artist: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 20,
  },
});

module.exports = mongoose.model("Song", SongSchema);
