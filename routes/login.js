const express = require('express');
const router  = express.Router();

const database = require("../db/queries/users");

router.get('/', (req, res) => {
  res.render('login');
});

// Log a user in
router.post("/", (req, res) => {
  console.log(req.body.password);
  const email = req.body.email;
  const password = req.body.password;


  database.getUserWithEmail(email).then((user) => {
    if (!user) {
      return res.send({ error: "no user with that email" });
    }
    if (password !== user.password) {
      return res.send({ error: "password not correct" });
    }
    req.session.userId = user.id;
    console.log(user);
    res.redirect('/quiz-settings');
    // res.send({
    //   user: {
    //     name: user.name,
    //     email: user.email,
    //     id: user.id,
    //   },
    // });
  })
  .catch((err) => {
    console.error(err.message);
    res.status(500).send('An error occurred');
  });
});

module.exports = router;
