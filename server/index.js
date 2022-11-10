"use strict";
// Imports
const express = require("express")
const cors = require("cors");
const database = require("./utils/database");
const fileUpload = require("express-fileupload");
const path = require("path");

// Routers
const userRouter = require("./router/userRouter");
const authRouter = require("./router/authRouter");
const postRouter = require("./router/postRouter");
const imageRouter = require("./router/imageRouter");


// Global Vars
const app = express();
const PORT = process.env.PORT || 4000;
const databaseURL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/newtestA";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

// Database Connection
database(databaseURL);

// Server setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  methods: "*",
  origin: CORS_ORIGIN
}));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, "tmp")
}));

// Routers
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/image", imageRouter);


// Server Activator
app.listen(PORT, console.log(`--- Server is listening on port: ${PORT}`))