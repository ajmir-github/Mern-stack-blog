const express = require("express");
const router = express.Router();
const {
  signIn,
  authToken,
  authHeader
} = require("../Controller/authController");



router.post("/sign_in", // sign in user by creating a user and sending its token back
  signIn
);


router.post("/auth_token", // verify the token and get its user back
  authToken
);


router.post("/test",
  authHeader,
  (req, res) => {
    res.send(req.payload)
  }
)

// exports
module.exports = router;