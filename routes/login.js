const express = require('express');
const router  = express.Router();
const database = require("../db/queries/users.js");


router.get('/', (req, res) => {
  res.render('login');
});

// Log a user in
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;


  // database.getUsers(email).then((user) => {
  //   if (!user) {
  //     return res.send({ error: "no user with that id" });
  //   }
  //   console.log(user);
  //   if (!password === user.password) {
  //     return res.send({ error: "error" });
  //   }

  //   req.session.userId = user.id;
  //   res.send({
  //     user: {
  //       name: user.name,
  //       email: user.email,
  //       id: user.id,
  //     },
  //   });
  // });
});

module.exports = router;