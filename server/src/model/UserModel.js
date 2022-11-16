const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    posts: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "post",
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("user", UserSchema);
