const express = require("express");
const router = express.Router();
const quizQueries = require("../db/queries/quiz");

router.get("/:id", (req, res) => {
  let button = true;
  req.session.quiz_id = req.params.id;
  const user = req.session.user;
  quizQueries
    .getQuiz(req.session.quiz_id)
    .then((quiz) => {
      if (!quiz) {
        return res.send({ error: "no quiz with that id" });
      }
      quizQueries
        .getQuizQuestions(req.session.quiz_id)
        .then((quizQuestions) => {
          const quizInfo = { quiz, quizQuestions, button,user };
          console.log(quizInfo);
          res.render("quiz-settings", quizInfo);
        });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("An error occurred");
    });
});

module.exports = router;
