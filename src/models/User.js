const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 20,
  },
  photoURL: {
    type: String,
    required: true,
    trim: true,
  },
  uid: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  token: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
