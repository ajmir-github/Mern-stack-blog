const { UserModel } = require("../model/UserModel");
const secureToken = require("../utils/secureToken");
const encrypt = require("../utils/encrypt");


exports.signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    // if username not matched
    if (user === null) throw {
      message: "Username not found!",
      status: 400
    }
    // if password not matched
    if (!await encrypt.match(password, user.password)) throw {
      message: "Password not matched!",
      status: 400
    }
    // set up a tokenized cookie
    const token = await secureToken.sign(user._id.toString());
    res.json({ token, user })
  } catch ({ message, status }) {
    res
      .status(status || 500)
      .send(message)
  }

}


exports.authToken = async (req, res) => {
  try {
    // decode the token
    const { token } = req.body;
    if (typeof token === "undefined") throw {
      message: "Provide a token!",
      status: 400
    };
    const userId = await secureToken.verfy(token);
    // get the correspondent user
    const user = await UserModel.findById(userId);
    res.json(user);
  } catch ({ message, status }) {
    res
      .status(status || 500)
      .send(message)
  }
}


exports.authHeader = async (req, res, next) => {
  try {
    // decode the token
    const { authorization } = req.headers;
    if (typeof authorization === "undefined") throw {
      message: "Provide a header authorization!",
      status: 400
    };
    const token = authorization.replace("token ", "");
    const userId = await secureToken.verfy(token);
    // get the correspondent user
    const user = await UserModel.findById(userId);
    req.payload = user;
    next();
  } catch ({ message, status }) {
    res
      .status(status || 500)
      .send(message)
  }
}