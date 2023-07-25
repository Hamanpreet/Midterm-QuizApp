const express = require('express');
const router  = express.Router();

const database = require("../db/queries/quiz");

// show a particular quiz questions
router.get("/:id", (req, res) => {
  const quizId = req.params.id;
  database.getQuestionsWithQuizId(quizId)
    .then((questions) => {
      // Fetch options for all questions concurrently using Promise.all
      const optionsPromises = questions.map((question) => {
        return database.getOptionsWithQuestionId(question.id);
      });

      // Wait for all options to be fetched before proceeding
      return Promise.all(optionsPromises)
        .then((options) => {
          const user = req.session.user;
          questionsArray = questions;
          optionsArray = options;
          const templateVars = { questions, options, user, quizId };
          res.render("quizAttempt", templateVars);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send("Internal Server Error");
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
});


router.post("/:id/submit", async (req, res) => {
  const quizId = req.params.id;
  const userAnswers = req.body;

  try {
    const score = await database.checkAnswers(quizId, userAnswers);

    console.log(score);

    res.redirect(`/quiz/${quizId}/result?score=${score}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
