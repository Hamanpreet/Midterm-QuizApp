const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

const getUserWithEmail = function(email) {
  return db
  .query(`
  SELECT *
  FROM users
  WHERE users.email = $1;
  `,[email])
  .then(res => {
    return res.rows[0] || null;
  })
  .catch(err => console.error(err.message));
};


router.get('/', (req, res) => {
  res.render('login');
});


// Log a user in
router.post("/:id", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  req.session.user_id = req.params.id;
  

  getUserWithEmail(email).then((user) => {
    if (!user) {
      return res.send({ error: "no user with that email" });
    }
    if (password !== user.password) {
      return res.send({ error: "password not correct" });
    }
    req.session.userId = user.id;
    console.log(user);
    res.send({
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
      },
    });
  })
  .catch((err) => {
    console.error(err.message);
    res.status(500).send('An error occurred');
  });
});

module.exports = router;