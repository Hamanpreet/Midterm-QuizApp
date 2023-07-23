const express = require('express');
const router  = express.Router();
const database = require("../db/queries/users.js");
//const session = require('express-session');


router.get('/', (req, res) => {
  const user = req.session.user;
  res.render('register', {user});
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
    return database.getUserWithEmail(email).then((user) => {
      if (user) {
              errors.push({message:"Email already registered"});
              res.render('register', {errors});
            } else {
              database.addUserToDatabase(name,email,password).then(result=> {
                //console.log(result.rows);
                res.redirect('/login');
              })
            }
    })
    .catch(err => console.error(err.message));
  }


});


module.exports = router;
