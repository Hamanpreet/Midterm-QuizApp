const express = require('express');
const router  = express.Router();
// const database = require("../db/queries/users.js");
const db = require('../db/connection');
//const session = require('express-session');


router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', (req,res) => {
  let {name,email,password, password2} = req.body;
  console.log(name,email,password,password2);

  let errors = [];
  //validation checks
  if (!name ||!email ||!password ||!password2) {
    errors.push({message:"Please enter all fields"});
  }
  if (password.length < 6) {
    errors.push({message:"Password should be a least 6 characters"});
  }
  if (password != password2) {
    errors.push({message:"Passwords don't match"});
  }
  if (errors.length > 0) {
    res.render('register', {errors});
  } else {
    //Form validation has passed
    return db
    .query(`
    SELECT *
    FROM users
    WHERE users.email = $1;
    `,[email])
    .then(result => {
      console.log(result.rows);
      if (result.rows.length > 0) {
        errors.push({message:"Email already registered"});
        res.render('register', {errors});
      } else {
        db.query(
          `INSERT INTO users(name, email, password)
          VALUES($1, $2, $3)
          RETURNING *`,
          [name, email, password]
        ).then(result => {
          console.log(result.rows);
          res.redirect('/login');
        })

      }

    })
    .catch(err => console.error(err.message));
  }

});


module.exports = router;
