// load .env data into process.env
require("dotenv").config();

// Web server config
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 8080;
const app = express();

app.set("view engine", "ejs");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  session({
    secret: "1010",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true for HTTPS environments
      maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (in milliseconds)
    },
  })
);

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require("./routes/users-api");
const usersRoutes = require("./routes/users");
const login = require("./routes/login");
const register = require("./routes/register");
const quizOptions = require("./routes/quiz-options");
const quizSettings = require("./routes/quiz-settings");
const quizzes = require("./routes/quizzes");
const attempts = require("./routes/attempts");
const quizAttempts = require("./routes/quizAttempts");
const logout = require("./routes/logout");
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use("/api/users", userApiRoutes);
app.use("/users", usersRoutes);
// Note: mount other resources here, using the same pattern above
app.use("/login", login);
app.use("/register", register);
app.use("/quiz-options", quizOptions);
app.use("/quiz-settings", quizSettings);
app.use("/quizzes", quizzes);
app.use("/attempts", attempts);
app.use("/quizAttempts", quizAttempts);
app.use("/logout", logout);
// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  const user = req.session.user;
  res.render("index", {user});
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
