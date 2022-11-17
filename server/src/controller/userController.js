const statusCodes = require("../utils/statusCodes");
// --------------------------------
// Standalon Meddlewares

// GET /user
exports.getUser =
  (
    UserModel,
    UserLimit = 10,
    defaultSort = { date: -1 },
    projection = "_id img fullName title"
  ) =>
  async (req, res) => {
    try {
      const users = await UserModel.find(undefined, projection)
        .sort(defaultSort)
        .limit(+req.query.limit || UserLimit)
        .skip(+req.query.skip || 0);
      // not content
      if (users.length === 0)
        throw {
          message: "No users found!",
          status: statusCodes.OK,
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
  (
    UserModel,
    userProjection = "-password",
    IncrementToViews = 2,
    DefaultPostPopulateOptions = {
      path: "posts",
      sort: { date: -1 },
      limit: 10,
      skip: 0,
    }
  ) =>
  async (req, res) => {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id, userProjection).populate(
        DefaultPostPopulateOptions
      );
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
    const inputs = req.body;
    if ((await UserModel.findOne({ username: inputs.username })) !== null)
      throw {
        message: "A user is already created by this username!",
        status: statusCodes.BAD_REQUEST,
      };
    // hash password
    if (typeof inputs?.password !== "undefined") {
      inputs.password = await hash(inputs?.password);
    }
    // Create it
    const User = new UserModel({
      ...inputs,
    });
    const createdUser = await User.save();
    // Send back the user id
    res.status(statusCodes.CREATED).send(createdUser._id);
  } catch ({ message, status }) {
    res
      .status(status || statusCodes.SERVER_ERROR)
      .json(message || "+++ Server error!");
  }
};

// DELETE /user
exports.deleteUser =
  (authUserKey = "authUser") =>
  async (req, res) => {
    try {
      // Get the ID param
      const user = req.payload.get(authUserKey);
      await user.remove();
      // response
      res.status(statusCodes.OK).send("The user is deleted!");
    } catch ({ message, status }) {
      res
        .status(status || statusCodes.SERVER_ERROR)
        .json(message || "+++ Server error!");
    }
  };

// UPDATE /user
exports.updateUser =
  (UserModel, hash, authUserKey = "authUser") =>
  async (req, res) => {
    try {
      // Update the user
      const inputs = req.body;
      const user = req.payload.get(authUserKey);
      // update username by making sure that its unique
      if (typeof inputs?.username !== "undefined") {
        if ((await UserModel.findOne({ username: inputs?.username })) !== null)
          throw {
            message: "A user is already created by this username!",
            status: statusCodes.BAD_REQUEST,
          };
      }
      // update password by hashing it
      if (typeof inputs?.password !== "undefined") {
        inputs.password = await hash(inputs?.password);
      }
      // apply the changes
      await user.set({ ...inputs }).save();
      // hide the password
      if (typeof inputs.password !== "undefined") delete inputs.password;
      // response
      res.status(statusCodes.OK).send("User updated!");
    } catch ({ message, status }) {
      res
        .status(status || statusCodes.SERVER_ERROR)
        .json(message || "+++ Server error!");
    }
  };
