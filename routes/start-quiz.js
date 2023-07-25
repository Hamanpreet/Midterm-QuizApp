const express = require('express');
const router  = express.Router();

const database = require("../db/queries/quiz");

//show all public quizzes
router.get('/:id', (req, res) => {
  const id = req.params.id;
  database.getQuiz(id)
  .then((quiz)=> {
    const user = req.session.user;
    // const user = users[userID];
    const templateVars = { quiz: quiz, user};
    res.render("start-quiz",templateVars);
  })
  .catch((err)=>{
    console.log(`An error occurred: ${err}`)
  });
});

module.exports = router;