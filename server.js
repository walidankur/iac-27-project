const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session"); // express-session vs cookie-session?
require('dotenv').config()

const app = express();
// var token = crypto.randomBytes(64).toString('hex');

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_SECRET || "COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true,
    sameSite: 'strict'
  })
);

// database
const db = require("./app/models");

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to IAC application." });
});

// routes
const authRouter = require("./app/routes/auth.routes");
authRouter(app);

const userRouter = require("./app/routes/user.routes");
userRouter(app);

const itemRouter = require("./app/routes/item.routes");
itemRouter(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});