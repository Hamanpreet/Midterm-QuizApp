
const express = require('express');
const router  = express.Router();

const database = require("../db/database")


router.get('/', (req, res) => {
  database.getAllPublicQuizzes()
  .then((quizzes)=> {
    const templateVars = { quizzes: quizzes };
    res.render("quizzes", templateVars)
  })
  .catch((err)=>{
    console.log(`An error occurred: ${err}`)
  });
});



module.exports = router;
