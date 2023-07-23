const express = require("express");
const router = express.Router();
const quizQueries = require("../db/queries/quiz");

router.get("/:id", (req, res) => {
  req.session.question_id = req.params.id;
  quizQueries
    .getQuizQuestion(req.session.question_id)
    .then((question) => {
      quizQueries
        .getQuizQuestionsOptions(req.session.question_id)
        .then((options) => {
          const quizOptions = { question, options };
          console.log(quizOptions);
          res.render("quiz-options", quizOptions);
        });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("An error occurred");
    });
});

module.exports = router;
