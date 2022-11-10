const { UserModel } = require("../model/UserModel");
const { hash } = require("../utils/encrypt")



// --------------------------------
// GLOBAL VARS
const UserLimit = process.env.USER_LIMIT || 10;


// --------------------------------
// Standalon Meddlewares

// GET /user
exports.getUser = async (req, res) => {
  try {
    const users = await UserModel
      .find(undefined, "-password")
      .sort({ date: -1 })
      .limit(+req.query.limit || UserLimit)
      .skip(+req.query.skip || 0)
      .populate("posts");

    // send users
    res.json(users);
  } catch ({ message, status }) {
    res
      .status(status || 500)
      .json(message || "+++ Server error!")
  }
};



// USER /user/:_id
exports.getSingleUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await UserModel
      .findById(_id, "-password")
      .populate("posts");

    // send the user
    res.json(user);
  } catch ({ message, status }) {
    res
      .status(status || 500)
      .json(message || "+++ Server error!")
  }
}

// POST /user
exports.createUser = async (req, res) => {
  try {
    // Check this username is created or not
    const { username } = req.body;
    if (await UserModel.findOne({ username }) !== null) throw {
      message: "A user is already created by this username!",
      status: 400
    };
    // hash password
    if (typeof req.body?.password !== "undefined") {
      req.body.password = await hash(req.body?.password)
    }
    // Create it
    const User = new UserModel({
      ...req.body
    });
    const { _id } = await User.save();
    // Send back the user id
    res
      .status(201)
      .send(_id);

  } catch ({ message, status }) {
    res
      .status(status || 500)
      .json(message || "+++ Server error!");
  }
}



// DELETE /user
exports.deleteUser = async (req, res) => {
  try {
    // Get the ID param
    await req.payload.remove();
    // response
    res
      .send("Your user is deleted!");
  } catch ({ message, status }) {
    res
      .status(status || 500)
      .json(message || "+++ Server error!")
  }
}



// UPDATE /user
exports.updateUser = async (req, res) => {
  try {
    // Update the user
    await req.payload
      .set({ ...req.body })
      .save();
    // response
    res
      .status(201)
      .send("Your user is updated!");
  } catch ({ message, status }) {
    res
      .status(status || 500)
      .json(message || "+++ Server error!")
  }
};