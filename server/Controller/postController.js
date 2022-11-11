const { PostModel } = require("../model/PostModel");
const { UserModel } = require("../model/UserModel");


// --------------------------------
// GLOBAL VARS
const PostLimit = process.env.POST_LIMIT || 10;

// GET /post
exports.getPost = async (req, res) => {
  try {
    const posts = await PostModel
      .find()
      .sort({ date: -1 })
      .limit(+req.query.limit || PostLimit)
      .skip(+req.query.skip || 0)
      .populate("createdBy", "-password");
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
      .populate("createdBy", "-password");

    // send the post
    res.json(post);

    // increment views to post
    post.views++;
    await post.save();
    // increment views to user posted this
    const userId = post.createdBy._id.toString();
    const user = await UserModel.findById(userId)
    user.views++;
    await user.save();

  } catch ({ message, status }) {
    res
      .status(status || 500)
      .json(message || "+++ Server error!")
  }


}


// POST /post
exports.createPost = async (req, res) => {
  try {
    const user = req.payload.get("authUser");
    // Create it
    const post = new PostModel({
      ...req.body,
      createdBy: user._id.toString()
    });
    const { _id } = await post.save();
    // Send back the post id
    res
      .status(201)
      .send(_id);
    // append the post in the user's post
    user.posts.push(_id.toString());
    await user.save();
  } catch ({ message, status }) {
    res
      .status(status || 500)
      .json(message || "+++ Server error!");
  }
}



// DELETE /post
exports.deletePost = async (req, res) => {
  try {
    // Delete the post
    const user = req.payload.get("authUser");
    const { _id } = req.params;
    const post = await PostModel.findById(_id);
    // Is this user allowed
    if (user.toString() !== post.createdBy.toString()) throw {
      message: "You are not allowed!",
      status: 403
    };
    // delete
    await post.remove();
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
    const user = req.payload.get("authUser");
    const post = await PostModel.findById(req.params._id);
    // Is this user allowed
    const userId = user._id.toString();
    const createdById = post.createdBy.toString();
    if (userId !== createdById) throw {
      message: "You are not allowed!",
      status: 403
    };
    // update
    await post
      .set({ ...req.body })
      .save();
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