const express = require("express");
const router = express.Router();
const quizQueries = require("../db/queries/quiz");
const updateTable = require("../db/queries/updateTable");

router.get("/:id", (req, res) => {
  req.session.quiz_id = req.params.id;
  quizQueries
    .getQuiz(req.session.quiz_id)
    .then((quiz) => {
      if (!quiz) {
        return res.send({ error: "no quiz with that id" });
      }
      quizQueries
        .getQuizQuestions(req.session.quiz_id)
        .then((quizQuestions) => {
          const quizInfo = { quiz, quizQuestions };
          res.render("quiz-settings", quizInfo);
        });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("An error occurred");
    });
});

//INSERT INTO questions (quiz_id, title, question, answer_id)

router.post("/:id", (req, res) => {
  let { title, description } = req.body;
  let private = false;
  console.log(req.body);
  req.body.private === "on" ? (private = true) : (private = false);

  updateTable
    .updateQuizTitle(title, req.session.quiz_id)
    .then(() => {
      updateTable
        .updateQuizDescription(description, req.session.quiz_id)
        .then(() => {
          updateTable.updateQuizPrivacy(private, req.session.quiz_id);
          res.redirect("/quiz-settings/" + req.session.quiz_id);
        });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("An error occurred");
    });
});

module.exports = router;
