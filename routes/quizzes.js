const express = require('express');
const router  = express.Router();

const database = require("../db/queries/quiz");

//show all public quizzes
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

// show a particular quiz questions
router.get("/:id", async (req, res) => {
  try {
    const questions = await database.getQuestionsWithQuizId(req.params.id);

    // Fetch options for all questions concurrently using Promise.all
    const optionsPromises = questions.map((question) => {
      return database.getOptionsWithQuestionId(question.id);
    });

    // Wait for all options to be fetched before proceeding
    const optionsResults = await Promise.all(optionsPromises);
    const options = optionsResults.map((optionsResult) => optionsResult);
    console.log(options);
    const templateVars = { questions, options };
    res.render("questions", templateVars);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});



module.exports = router;
