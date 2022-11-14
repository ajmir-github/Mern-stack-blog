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
const {
  PORT,
  DB_URL,
  DB_PASSWORD,
  CORS_ORIGIN
} = process.env;


// Database Connection
database(DB_URL.replace("<password>", DB_PASSWORD));

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
    cookie: req.cookies,
    files:req.files
  })
})

// Server Activator
app.listen(PORT, console.log(`--- Server is listening on port: ${PORT}`))