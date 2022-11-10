const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  posts: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "post",
    }
  ]
}, { versionKey: false });

const UserModel = mongoose.model("user", UserSchema);
module.exports = { UserModel }