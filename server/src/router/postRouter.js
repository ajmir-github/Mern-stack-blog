// imports
const express = require("express");
const UserModel = require("../model/UserModel");
const secureToken = require("../utils/secureToken");

// Global vars
const router = express.Router();
const {
  getPost,
  getSinglePost,
  createPost,
  deletePost,
  updatePost,
} = require("../controller/postController");
const { authHeader } = require("../controller/authController");

// Routes
router.get(
  "/", // Get Posts
  getPost
);

router.get(
  "/:_id", // Get a single post
  getSinglePost
);

router.post(
  "/", // Create a Post
  authHeader(UserModel, secureToken),
  createPost
);

router.delete(
  "/:_id", // Delete a Post
  authHeader(UserModel, secureToken),
  deletePost
);

router.patch(
  "/:_id", // Update a Post
  authHeader(UserModel, secureToken),
  updatePost
);

// export
module.exports = router;
