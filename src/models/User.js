const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  nickName: {
    type: String,
  },
  photoUrl: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
