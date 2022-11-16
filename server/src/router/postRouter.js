// imports
const express = require("express");
const UserModel = require("../model/UserModel");
const secureToken = require("../utils/secureToken");
const PostModel = require("../model/PostModel");

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
  getPost(PostModel)
);

router.get(
  "/:id", // Get a single post
  getSinglePost(PostModel)
);

router.post(
  "/", // Create a Post
  authHeader(UserModel, secureToken),
  createPost(PostModel)
);

router.delete(
  "/:id", // Delete a Post
  authHeader(UserModel, secureToken),
  deletePost(PostModel)
);

router.patch(
  "/:id", // Update a Post
  authHeader(UserModel, secureToken),
  updatePost(PostModel)
);

// export
module.exports = router;
