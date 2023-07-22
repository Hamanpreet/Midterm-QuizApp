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
    console.log(res.rows);
    return res.rows[0] || null;
  })
  .catch(err => console.error(err.message));
};


router.get('/', (req, res) => {
  res.render('login');
});


// Log a user in
router.post("/", (req, res) => {
  console.log(req.body.password);
  const email = req.body.email;
  const password = req.body.password;


  getUserWithEmail(email).then((user) => {
    if (!user) {
      return res.status(404).send({ error: "no user with that email" });
    }
    if (password !== user.password) {
      return res.status(403).send({ error: "password not correct" });
    }
    req.session.userId = user.id;
    console.log(user);
    res.redirect('/quiz-settings');
  })
  .catch((err) => {
    console.error(err.message);
    res.status(500).send('An error occurred');
  });
});

//clears cookie and redirect to login page
router.post("/logout", (req,res) =>{
  req.session.user_id = null;
  res.redirect('/login');
});

module.exports = router;
