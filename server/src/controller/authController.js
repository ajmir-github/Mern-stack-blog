const statusCodes = require("../utils/statusCodes");
// Standalone Meddleware
exports.signIn =
  (UserModel, secureToken, encrypt, projection = "-posts -views") =>
  async (req, res) => {
    // Sign in user using its username and hashed password
    // Put the user's id in a secure token and send back
    // Alos sent the user itself back too
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ username }, projection);
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
      let clonedUser = JSON.parse(JSON.stringify(user));
      delete clonedUser.password;
      res.json({ token, user: clonedUser });
    } catch ({ message, status }) {
      res
        .status(status || statusCodes.SERVER_ERROR)
        .send(message || "+++ Server error!");
    }
  };

// Standalone Meddleware
exports.verifyToken =
  (
    UserModel,
    secureToken,
    authTokenKey = "authToken",
    projection = "-password -posts -views"
  ) =>
  async (req, res) => {
    try {
      // Get the sent token
      const token = req.payload.get(authTokenKey);
      if (typeof token === "undefined")
        throw {
          message: "Provide a token!",
          status: statusCodes.BAD_REQUEST,
        };
      const userId = await secureToken.verfy(token);
      // get the correspondent user
      const user = await UserModel.findById(userId, projection);
      // if user does not exists
      if (user === null)
        throw {
          message: "This user does not exists anymore!",
          status: statusCodes.NOT_FOUND,
        };
      // hide the password
      let clonedUser = JSON.parse(JSON.stringify(user));
      delete clonedUser.password;
      res.json(clonedUser);
    } catch ({ message, status }) {
      res
        .status(status || statusCodes.SERVER_ERROR)
        .send(message || "+++ Server error!");
    }
  };

// Dependant Meddleware
exports.authHeader =
  (UserModel, secureToken, authTokenKey = "authToken", userKey = "authUser") =>
  async (req, res, next) => {
    // Get the token from headers.authorization
    // Verify and get the targeted user
    try {
      // verify the token
      const token = req.payload.get(authTokenKey);
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
