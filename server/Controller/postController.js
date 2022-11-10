const { PostModel } = require("../model/PostModel");


// --------------------------------
// Standalone Meddlewares

// GET /post
exports.getPost = async (req, res) => {
  try {
    const posts = await PostModel
      .find()
      .sort({ date: -1 })
      .limit(+req.query.limit || 10)
      .skip(+req.query.skip || 0)
      .populate("createdBy");
    // send the posts
    res.json(posts);
  } catch ({ message, status }) {
    res
      .status(status || 500)
      .json(message || "+++ Server error!")
  }
};

// POST /post/:_id
exports.getSinglePost = async (req, res) => {
  try {
    const { _id } = req.params;
    const post = await PostModel
      .findById(_id)
      .populate("createdBy");
    // send the post
    res.json(post);
  } catch ({ message, status }) {
    res
      .status(status || 500)
      .json(message || "+++ Server error!")
  }
}


// POST /post
exports.createPost = async (req, res) => {
  try {
    // Create it
    const post = new PostModel({
      ...req.body,
      createdBy: req.payload._id.toString()
    });
    const { _id } = await post.save();
    // Send back the post id
    res
      .status(201)
      .send(_id);
    // append the post in the user's post
    req.payload.posts.push(_id.toString());
    await req.payload.save();
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