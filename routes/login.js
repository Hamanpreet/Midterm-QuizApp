const express = require("express");
const router = express.Router();

const database = require("../db/queries/users");

router.get("/", (req, res) => {
  res.render("login");
});

// Log a user in
router.post("/", (req, res) => {
  console.log(req.body.password);
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
      req.session.userId = user.id;
      console.log(user);
      res.redirect("/");
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("An error occurred");
    });
});

//clears cookie and redirect to login page
router.post("/logout", (req, res) => {
  req.session.user_id = null;
  res.redirect("/login");
});

module.exports = router;
