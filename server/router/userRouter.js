// imports
const express = require("express");

// Global vars
const router = express.Router();
const {
  getUser,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../controller/userController");
const {
  authHeader
} = require("../controller/authController");


// Routes
router.get("/", // Get Users
  getUser
)

// Routes
router.get("/:_id", // Get A Single user
  getSingleUser
)

router.post("/", // Create a User
  createUser
)

router.delete("/", // Delete a user
  authHeader,
  deleteUser
)

router.patch("/", // Update a user
  authHeader,
  updateUser
)


// export
module.exports = router;