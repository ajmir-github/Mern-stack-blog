// Imports
const express = require("express")
const cors = require("cors");
const database = require("./utils/database");
// Routers
const userRouter = require("./Router/userRouter");
const authRouter = require("./Router/authRouter");


// Global Vars
const app = express();
const PORT = process.env.PORT || 4000;
const databaseURL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/newtestA";

// Database Connection
database(databaseURL);

// Server setup
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
  methods: "*",
  origin: "*"
}))

// Routers
app.use("/user", userRouter);
app.use("/auth", authRouter);



// Server Activator
app.listen(PORT, console.log(`--- server is listening on port: ${PORT}`))