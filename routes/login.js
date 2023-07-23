const express = require("express");
const router = express.Router();

const database = require("../db/queries/users");

router.get('/', (req, res) => {
  const user = req.session.user;
  res.render("login",{user});
});

// Log a user in
router.post("/", (req, res) => {
  console.log(req.body.password);
  const email = req.body.email;
  const password = req.body.password;

  database.getUserWithEmail(email).then((user) => {
    if (!user) {
      return res.status(404).send({ error: "no user with that email" });
    }
    if (password !== user.password) {
      return res.status(403).send({ error: "password not correct" });
    }
    req.session.user = user;
    res.redirect('/quizzes');
  })
  .catch((err) => {
    console.error(err.message);
    res.status(500).send('An error occurred');
  });
});



module.exports = router;
