const express = require('express');
const router  = express.Router();

//clears cookie and redirect to login page

router.all("/", (req,res) =>{
  req.session.user = null;
  res.redirect('/quizzes');
});


module.exports = router;
