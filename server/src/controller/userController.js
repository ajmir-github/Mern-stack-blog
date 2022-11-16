const statusCodes = require("../utils/statusCodes");
// --------------------------------
// Standalon Meddlewares

// GET /user
exports.getUser =
  (UserModel, UserLimit = 10, defaultSort = { date: -1 }) =>
  async (req, res) => {
    try {
      const users = await UserModel.find(undefined, "-password")
        .sort(defaultSort)
        .limit(+req.query.limit || UserLimit)
        .skip(+req.query.skip || 0)
        .populate("posts");
      // not content
      if (users.length === 0)
        throw {
          message: "No users found!",
          status: statusCodes.NO_CONTENT,
        };
      // send users
      res.json(users);
    } catch ({ message, status }) {
      res
        .status(status || statusCodes.SERVER_ERROR)
        .json(message || "+++ Server error!");
    }
  };

// USER /user/:_id
exports.getSingleUser =
  (UserModel, PostLimit = 10, IncrementToViews = 2) =>
  async (req, res) => {
    try {
      const { _id } = req.params;
      const user = await UserModel.findById(_id, "-password").populate({
        path: "posts",
        options: {
          sort: { date: -1 },
          limit: +req.query.limit || PostLimit,
          skip: +req.query.skip || 0,
        },
      });
      // if not exist
      if (user === null)
        throw {
          message: "There is no user with the give id!",
          status: statusCodes.NOT_FOUND,
        };

      // send the user
      res.json(user);

      // Increment views
      user.views += IncrementToViews;
      await user.save();
    } catch ({ message, status }) {
      res
        .status(status || statusCodes.SERVER_ERROR)
        .json(message || "+++ Server error!");
    }
  };

// POST /user
exports.createUser = (UserModel, hash) => async (req, res) => {
  try {
    // Check this username is created or not
    const { username } = req.body;
    if ((await UserModel.findOne({ username })) !== null)
      throw {
        message: "A user is already created by this username!",
        status: statusCodes.BAD_REQUEST,
      };
    // hash password
    if (typeof req.body?.password !== "undefined") {
      req.body.password = await hash(req.body?.password);
    }
    // Create it
    const User = new UserModel({
      ...req.body,
    });
    const { _id } = await User.save();
    // Send back the user id
    res.status(statusCodes.CREATED).send(_id);
  } catch ({ message, status }) {
    res
      .status(status || statusCodes.SERVER_ERROR)
      .json(message || "+++ Server error!");
  }
};

// DELETE /user
exports.deleteUser =
  (userKey = "authUser") =>
  async (req, res) => {
    try {
      // Get the ID param
      const user = req.payload.get(userKey);
      await user.remove();
      // response
      res.status(statusCodes.NO_CONTENT).send("The user is deleted!");
    } catch ({ message, status }) {
      res
        .status(status || statusCodes.SERVER_ERROR)
        .json(message || "+++ Server error!");
    }
  };

// UPDATE /user
exports.updateUser =
  (userKey = "authUser") =>
  async (req, res) => {
    try {
      // Update the user
      const user = req.payload.get(userKey);
      await user.set({ ...req.body }).save();
      // response
      res.status(statusCodes.NO_CONTENT).send("The user is updated!");
    } catch ({ message, status }) {
      res
        .status(status || statusCodes.SERVER_ERROR)
        .json(message || "+++ Server error!");
    }
  };
