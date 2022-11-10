// imports
const express = require("express");

// Global vars
const router = express.Router();
const {
  getUser,
  createUser,
  deleteUser,
  updateUser
} = require("../Controller/userController");


// Routes
router.get("/", // Get Users
  getUser
)

router.post("/", // Create a User
  createUser
)

router.delete("/:_id", // Delete a user
  deleteUser
)

router.patch("/:_id", // Update a user
  updateUser
)


// export
module.exports = router;