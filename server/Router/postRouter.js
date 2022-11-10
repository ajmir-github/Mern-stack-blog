// imports
const express = require("express");


// Global vars
const router = express.Router();
const {
  getPost,
  getSinglePost,
  createPost,
  deletePost,
  updatePost
} = require("../controller/postController");
const { authHeader } = require("../controller/authController");

// Routes
router.get("/", // Get Posts
  getPost
)

router.get("/:_id", // Get a single post
  getSinglePost
)

router.post("/", // Create a Post
  authHeader,
  createPost
)

router.delete("/:_id", // Delete a Post
  deletePost
)

router.patch("/:_id", // Update a Post
  updatePost
)


// export
module.exports = router;