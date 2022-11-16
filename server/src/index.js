"use strict";
// Imports
const server = require("./server");
const dotenv = require("dotenv");
const path = require("path");
const database = require("./utils/database");

// Global Vars
dotenv.config(path.join(__dirname, ".env"));
const { PORT, DB_URL, DB_PASSWORD, FRONTEND_URL } = process.env;

// Database Connection
database(DB_URL.replace("<password>", DB_PASSWORD));

// Create the app
const app = server({
  methods: "GET, POST, PATCH, DELETE", // better that '*'
  origin: FRONTEND_URL,
  credentials: true, // it needs the origin to be specified
  // preflightContinue: true,
});

// Server Activator
app.listen(PORT, console.log(`--- Server is listening on port: ${PORT}`));
