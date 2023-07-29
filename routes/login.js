const express = require("express");
const router = express.Router();

const database = require("../db/queries/users");

router.get("/", (req, res) => {
  const user = req.session.user;

  // If the user is already logged in, redirect them to the homepage
  if (user) {
    return res.redirect("/");
  }

  // If the user is not logged in, render the login page
  res.render("login",{user});
});

// Log a user in
router.post("/", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  database
    .getUserWithEmail(email)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ error: "no user with that email" });
      }
      if (password !== user.password) {
        return res.status(403).send({ error: "password not correct" });
      }
      req.session.user = user;
      res.redirect(`/attempts/${user.id}`);
      //res.render("index",{user});
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("An error occurred");
    });
});

module.exports = router;
