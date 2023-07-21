const express = require("express");
const router = express.Router();
const quizQueries = require("../db/queries/quiz");

router.get("/:id", (req, res) => {
  req.session.quiz_id = req.params.id;
  quizQueries
    .getQuiz(req.session.quiz_id)
    .then((quiz) => {
      if (!quiz) {
        return res.send({ error: "no quiz with that id" });
      }
      const quizInfo = { quiz };
      res.render("quiz-settings", quizInfo);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("An error occurred");
    });
});

module.exports = router;
