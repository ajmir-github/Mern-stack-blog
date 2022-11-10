// imports
const express = require("express");

// Global vars
const router = express.Router();
const {
  getUser,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser
} = require("../Controller/userController");


// Routes
router.get("/", // Get Users
  getUser
)

// Routes
router.get("/", // Get A Single user
  getSingleUser
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