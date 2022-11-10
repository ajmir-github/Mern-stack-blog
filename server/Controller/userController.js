const { UserModel } = require("../Model/UserModel");
const { hash } = require("../utils/encrypt")


// --------------------------------
// Standalone Meddlewares

// GET /user
exports.getUser = async (req, res) => {
  try {
    const users = await UserModel
      .find()
      .sort({ date: -1 })
      .limit(+req.query.limit || 10)
      .skip(+req.query.skip || 0);
    // send users
    res.json(users);
  } catch ({ message, status }) {
    res
      .status(status || 500)
      .json(message || "+++ Server error!")
  }
};


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
    const { _id } = req.params;
    const deletedUser = await UserModel.findByIdAndDelete(_id);
    if (deletedUser === null) throw {
      message: "There is no user with the given id!",
      status: 400
    };
    res
      .send("A user with the given id was deleted!");
  } catch ({ message, status }) {
    res
      .status(status || 500)
      .json(message || "+++ Server error!")
  }
}



// UPDATE /user
exports.updateUser = async (req, res) => {
  try {
    // update the user
    const { _id } = req.params;
    await UserModel.findOneAndUpdate(
      _id,
      { ...req.body }
    );
    // give a response back
    res
      .status(201)
      .send("A user with the given id is updated!");
  } catch ({ message, status }) {
    res
      .status(status || 500)
      .json(message || "+++ Server error!")
  }
};