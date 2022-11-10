const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: false
  },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false });

const PostModel = mongoose.model("post", PostSchema)

module.exports = { PostModel }