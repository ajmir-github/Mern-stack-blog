const express = require("express");
const router = express.Router();
const {
  signIn,
  verifyToken,
} = require("../controller/authController");



router.post("/sign_in", // sign in user by creating a user and sending its token back
  signIn
);

router.post("/verify_token", // verify the token and get its user back
  verifyToken
);


// exports
module.exports = router;