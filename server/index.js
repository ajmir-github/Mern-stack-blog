"use strict";
// Imports
const express = require("express")
const dotenv = require("dotenv");
const cors = require("cors");
const database = require("./utils/database");
const fileUpload = require("express-fileupload");
const cookieParser = require('cookie-parser');
const path = require("path");
const payload = require("./utils/payload");

// Routers
const userRouter = require("./router/userRouter");
const authRouter = require("./router/authRouter");
const postRouter = require("./router/postRouter");
const imageRouter = require("./router/imageRouter");


// Global Vars
dotenv.config(".env")
const app = express();
const PORT = process.env.PORT || 4000;
const databaseURL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/newtestA";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

// Database Connection
database(databaseURL);
// Server setup
app.use(cors({
  methods: "GET, POST, PATCH, DELETE", // better that '*'
  origin: CORS_ORIGIN,
  credentials: true, // it needs the origin to be specified
  // preflightContinue: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, "tmp")
}));

// Payload func
app.use(payload);

// Routers
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/image", imageRouter);

app.all("/test", (req, res) => {
  res.json({
    cookies: req.cookies,
    body: req.body,
    query: req.query,
    headers: req.headers,
    cookie: req.cookies
  })
})

// Server Activator
app.listen(PORT, console.log(`--- Server is listening on port: ${PORT}`))