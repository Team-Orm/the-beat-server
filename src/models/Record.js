const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 20,
  },
  photoURL: {
    type: String,
    trim: true,
  },
  title: {
    type: String,
    required: true,
  },
  totalScore: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Record", RecordSchema);
