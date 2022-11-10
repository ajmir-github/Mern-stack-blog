// imports
const express = require("express");


// Global vars
const router = express.Router();
const {
  getPost,
  createPost,
  deletePost,
  updatePost
} = require("../Controller/postController");


// Routes
router.get("/", // Get Posts
  getPost
)

router.post("/", // Create a Post
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