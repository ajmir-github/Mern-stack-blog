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
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const PostModel = mongoose.model("post", PostSchema)

module.exports = { PostModel }