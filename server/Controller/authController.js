const { UserModel } = require("../model/UserModel");
const secureToken = require("../utils/secureToken");
const encrypt = require("../utils/encrypt");
// Globel vars
const authCookieName = process.env.AUTH_COOKIE_NAME || "auth";
function getTheToken(req) {
  return req.cookies[authCookieName] || req.headers["authorization"]
}

// Standalone Meddleware
exports.signIn = async (req, res) => {
  // Sign in user using its username and hashed password
  // Put the user's id in a secure token and send back
  // Alos sent the user itself back too
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
    const userId = user._id.toString();
    const token = await secureToken.sign(userId);
    res.json({ token, user })

  } catch ({ message, status }) {
    res
      .status(status || 500)
      .send(message)
  }

}



// Standalone Meddleware
exports.verifyToken = async (req, res) => {
  // Get the sent token
  // Verify and get the targeted user
  // Send the user back to the client
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
    // if user does not exists
    if (user === null) throw {
      message: "This user does not exists anymore!",
      status: 400
    };
    res.json(user);
  } catch ({ message, status }) {
    res
      .status(status || 500)
      .send(message)
  }
}


// Standalone Meddleware
exports.authHeader = async (req, res, next) => {
  // Get the token from headers.authorization
  // Verify and get the targeted user
  // save it as authUser
  try {
    // verify the token

    const token = getTheToken(req);
    if (typeof token === "undefined") throw {
      message: "Provide a token!",
      status: 400
    };
    const userId = await secureToken.verfy(token);
    // get the correspondent user
    const user = await UserModel.findById(userId);
    // if user not exisits
    if (user === null) throw {
      message: "This user does not exists anymore!",
      status: 400
    };
    // Response
    req.payload.save({ authUser: user })
    next();
  } catch ({ message, status }) {
    res
      .status(status || 500)
      .send(message)
  }
}