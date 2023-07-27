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
  const userId = req.session.user ? req.session.user.id : null;

  try {
    const grade = await database.checkAnswers(quizId, userAnswers);
    if (!userId) {
      // If userId is not available, send the score as a response
      return res.status(200).send(`Your score: ${grade}`);
    } else {
      // If userId is available, save the grade and redirect to the attempts page
      const saveAttempt = await database.saveGrade(quizId, userId, grade);
      if (saveAttempt) {
        return res.redirect(`/attempts/${userId}`);
      } else {
        return res.status(500).send("Failed to save the grade.");
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
