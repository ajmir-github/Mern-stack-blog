// Imports
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const path = require("path");
const payload = require("./utils/payload");

// Routers
const userRouter = require("./router/userRouter");
const authRouter = require("./router/authRouter");
const postRouter = require("./router/postRouter");
const imageRouter = require("./router/imageRouter");

// Main server func
function server(corsOptions) {
  // Server setup
  const app = express();
  app.use(cors(corsOptions));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: path.join(__dirname, "tmp"),
    })
  );
  // Payload func
  app.use(payload);

  // // Error Handling
  // if (process.env.NODE_ENV === "development") {
  // }
  // if (process.env.NODE_ENV === "production") {
  // }

  // Routers
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/post", postRouter);
  app.use("/image", imageRouter);

  // for front-end tests
  app.all("/test", (req, res) => {
    res.json({
      cookies: req.cookies,
      body: req.body,
      query: req.query,
      headers: req.headers,
      cookie: req.cookies,
      files: req.files,
    });
  });
  return app;
}

module.exports = server;
