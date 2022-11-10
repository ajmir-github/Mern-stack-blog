// Imports
const express = require("express")
const cors = require("cors");
const database = require("./utils/database");
// Routers
const userRouter = require("./Router/userRouter");
const authRouter = require("./Router/authRouter");
const postRouter = require("./Router/postRouter");


// Global Vars
const app = express();
const PORT = process.env.PORT || 4000;
const databaseURL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/newtestA";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

// Database Connection
database(databaseURL);

// Server setup
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
  methods: "*",
  origin: CORS_ORIGIN
}))

// Routers
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);



// Server Activator
app.listen(PORT, console.log(`--- server is listening on port: ${PORT}`))