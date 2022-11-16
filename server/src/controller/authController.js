const statusCodes = require("../utils/statusCodes");
// Standalone Meddleware
exports.signIn = (UserModel, secureToken, encrypt) => async (req, res) => {
  // Sign in user using its username and hashed password
  // Put the user's id in a secure token and send back
  // Alos sent the user itself back too
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    // if username not matched
    if (user === null)
      throw {
        message: "Username not found!",
        status: statusCodes.NOT_FOUND,
      };
    // if password not matched
    if (!(await encrypt.match(password, user.password)))
      throw {
        message: "Password not matched!",
        status: statusCodes.FORBIDDEN,
      };
    // set up a tokenized cookie
    const userId = user._id.toString();
    const token = await secureToken.sign(userId);
    // hide the password
    delete user.password;
    res.json({ token, user });
  } catch ({ message, status }) {
    res
      .status(status || statusCodes.SERVER_ERROR)
      .send(message || "+++ Server error!");
  }
};

// Standalone Meddleware
exports.verifyToken = (UserModel, secureToken) => async (req, res) => {
  // Get the sent token
  // Verify and get the targeted user
  // Send the user back to the client
  try {
    // decode the token
    const { token } = req.body;
    if (typeof token === "undefined")
      throw {
        message: "Provide a token!",
        status: statusCodes.BAD_REQUEST,
      };
    const userId = await secureToken.verfy(token);
    // get the correspondent user
    const user = await UserModel.findById(userId, "-password");
    // if user does not exists
    if (user === null)
      throw {
        message: "This user does not exists anymore!",
        status: statusCodes.NOT_FOUND,
      };

    res.json(user);
  } catch ({ message, status }) {
    res
      .status(status || statusCodes.SERVER_ERROR)
      .send(message || "+++ Server error!");
  }
};

// Dependant Meddleware
exports.authHeader =
  (UserModel, secureToken, userKey = "authUser") =>
  async (req, res, next) => {
    // Get the token from headers.authorization
    // Verify and get the targeted user
    try {
      // verify the token
      const token = req.payload.get(authToken);
      if (typeof token === "undefined")
        throw {
          message: "Provide a token!",
          status: statusCodes.BAD_REQUEST,
        };
      const userId = await secureToken.verfy(token);
      // get the correspondent user
      const user = await UserModel.findById(userId);
      // if user not exisits
      if (user === null)
        throw {
          message: "This user does not exists anymore!",
          status: statusCodes.NOT_FOUND,
        };
      // Response
      req.payload.save({ [userKey]: user });
      next();
    } catch ({ message, status }) {
      res
        .status(status || statusCodes.SERVER_ERROR)
        .send(message || "+++ Server error!");
    }
  };
