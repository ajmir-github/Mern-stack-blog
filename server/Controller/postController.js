const { PostModel } = require("../Model/PostModel");
const { hash } = require("../utils/encrypt")


// --------------------------------
// Standalone Meddlewares

// GET /post
exports.getPost = async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.json(posts);
  } catch ({ message, status }) {
    res
      .status(status || 500)
      .json(message || "+++ Server error!")
  }
};


// POST /post
exports.createPost = async (req, res) => {
  try {
    // Check this postname is created or not
    const { postname } = req.body;
    if (await PostModel.findOne({ postname }) !== null) throw {
      message: "A post is already created by this postname!",
      status: 400
    };
    // hash password
    if (typeof req.body?.password !== "undefined") {
      req.body.password = await hash(req.body?.password)
    }
    // Create it
    const post = new PostModel({
      ...req.body
    });
    const { _id } = await post.save();
    // Send back the post id
    res
      .status(201)
      .send(_id);

  } catch ({ message, status }) {
    res
      .status(status || 500)
      .json(message || "+++ Server error!");
  }
}



// DELETE /post
exports.deletePost = async (req, res) => {
  try {
    // Get the ID param
    const { _id } = req.params;
    const deletedpost = await PostModel.findByIdAndDelete(_id);
    if (deletedpost === null) throw {
      message: "There is no post with the given id!",
      status: 400
    };
    res
      .send("A post with the given id was deleted!");
  } catch ({ message, status }) {
    res
      .status(status || 500)
      .json(message || "+++ Server error!")
  }
}



// UPDATE /post
exports.updatePost = async (req, res) => {
  try {
    // update the post
    const { _id } = req.params;
    await PostModel.findOneAndUpdate(
      _id,
      { ...req.body }
    );
    // give a response back
    res
      .status(201)
      .send("A post with the given id is updated!");
  } catch ({ message, status }) {
    res
      .status(status || 500)
      .json(message || "+++ Server error!")
  }
};