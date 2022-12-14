const statusCodes = require("../utils/statusCodes");

// util Func
async function incremetPostViews(post, incrementToView) {
  try {
    // increment views to post
    post.views += incrementToView;
    await post.save();
  } catch (error) {
    console.log(error.message);
  }
}

// GET /post
exports.getPost =
  (
    PostModel,
    defaultLimit = 10,
    populateOptions = { path: "createdBy", select: "_id fullName img" }
  ) =>
  async (req, res) => {
    let query = {};
    // Search Query
    if (typeof req.query.search !== "undefined") {
      const pattern = { $regex: req.query.search, $options: "gi" };
      query.$or = [
        { title: pattern },
        { excerpt: pattern },
        { keywords: pattern },
      ];
    }
    // filter Query
    if (typeof req.query.keyword !== "undefined") {
      query.keywords = { $regex: req.query.keyword, $options: "gi" };
    }
    // user's id posts
    if (typeof req.query.user !== "undefined") {
      query.createdBy = req.query.user;
    }

    // Sort Query
    let sort = { date: -1 };
    if (typeof req.query.sort !== "undefined") {
      if (req.query.sort === "views") {
        sort = { views: -1 };
      }
    }

    try {
      const posts = await PostModel.find(query, "-body -keywords")
        .sort(sort)
        .limit(+req.query.limit || defaultLimit)
        .skip(+req.query.skip || 0)
        .populate(populateOptions);

      // send the posts
      res.json(posts);
    } catch ({ message, status }) {
      res
        .status(status || statusCodes.SERVER_ERROR)
        .json(message || "+++ Server error!");
    }
  };

// POST /post/:_id
exports.getSinglePost =
  (
    PostModel,
    incrementToView = 1,
    populateOptions = { path: "createdBy", select: "_id fullName img views" }
  ) =>
  async (req, res) => {
    try {
      const post = await PostModel.findById(req.params.id).populate(
        populateOptions
      );

      // if not found
      if (post === null)
        throw {
          message: "There is not post found with the given id!",
          status: statusCodes.NOT_FOUND,
        };
      // send the post
      res.json(post);

      incremetPostViews(post, incrementToView);
    } catch ({ message, status }) {
      res
        .status(status || statusCodes.SERVER_ERROR)
        .json(message || "+++ Server error!");
    }
  };

// POST /post
exports.createPost =
  (PostModel, userKey = "authUser") =>
  async (req, res) => {
    try {
      const user = req.payload.get(userKey);
      // Create it
      const post = new PostModel({
        ...req.body,
        createdBy: user._id.toString(),
      });
      const { _id } = await post.save();
      // Send back the post id
      res.status(statusCodes.CREATED).send(_id);
      // append the post in the user's post
      user.posts.push(_id.toString());
      await user.save();
    } catch ({ message, status }) {
      res
        .status(status || statusCodes.SERVER_ERROR)
        .json(message || "+++ Server error!");
    }
  };

// DELETE /post
exports.deletePost =
  (PostModel, refKey = "createdBy", userKey = "authUser") =>
  async (req, res) => {
    try {
      // Delete the post
      const user = req.payload.get(userKey);
      const post = await PostModel.findById(req.params.id);
      // Is this user allowed
      if (user._id.toString() !== post[refKey].toString())
        throw {
          message: "You are not allowed!",
          status: statusCodes.FORBIDDEN,
        };
      // delete
      await post.remove();
      res.status(statusCodes.OK).send("A post with the given id was deleted!");
    } catch ({ message, status }) {
      res
        .status(status || statusCodes.SERVER_ERROR)
        .json(message || "+++ Server error!");
    }
  };

// UPDATE /post
exports.updatePost =
  (PostModel, refKey = "createdBy", userKey = "authUser") =>
  async (req, res) => {
    try {
      // update the post
      const user = req.payload.get(userKey);
      const post = await PostModel.findById(req.params.id);
      // Is this user allowed
      const userId = user._id.toString();
      const createdById = post[refKey].toString();
      if (userId !== createdById)
        throw {
          message: "You are not allowed!",
          status: statusCodes.FORBIDDEN,
        };
      // update
      await post.set({ ...req.body }).save();
      // give a response back
      res.status(statusCodes.OK).send("A post with the given id is updated!");
    } catch ({ message, status }) {
      res
        .status(status || statusCodes.SERVER_ERROR)
        .json(message || "+++ Server error!");
    }
  };
