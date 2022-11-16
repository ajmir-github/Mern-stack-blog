// imports
const express = require("express");
const UserModel = require("../model/UserModel");
const secureToken = require("../utils/secureToken");
const { hash } = require("../utils/encrypt");

// Global vars
const router = express.Router();
const {
  getUser,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../controller/userController");
const { authHeader } = require("../controller/authController");

// Routes
router.get(
  "/", // Get Users
  getUser(UserModel)
);

// Routes
router.get(
  "/:id", // Get A Single user
  getSingleUser(UserModel)
);

router.post(
  "/", // Create a User
  createUser(UserModel, hash)
);

router.delete(
  "/", // Delete a user
  authHeader(UserModel, secureToken),
  deleteUser()
);

router.patch(
  "/", // Update a user
  authHeader(UserModel, secureToken),
  updateUser(UserModel, hash)
);

// export
module.exports = router;
