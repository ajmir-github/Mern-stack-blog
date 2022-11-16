const express = require("express");
const router = express.Router();
const UserModel = require("../model/UserModel");
const secureToken = require("../utils/secureToken");
const encrypt = require("../utils/encrypt");
const { signIn, verifyToken } = require("../controller/authController");

router.post(
  "/sign_in", // sign in user by creating a user and sending its token back
  signIn(UserModel, secureToken, encrypt)
);

router.post(
  "/verify_token", // verify the token and get its user back
  verifyToken(UserModel, secureToken)
);

// exports
module.exports = router;
