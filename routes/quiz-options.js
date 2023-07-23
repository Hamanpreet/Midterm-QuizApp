const express = require("express");
const router = express.Router();
const quizQueries = require("../db/queries/quiz");

router.get("/:id", (req, res) => {
  req.session.question_id = req.params.id;
  quizQueries
    .getQuizQuestionsOptions(req.session.question_id)
    .then((options) => {
      console.log(options);
      if (!options || Object.keys(options).length === 0) {
        return res.send({ error: "no quiz options with that id" });
      }
      const quizOptions = { options };
      res.render("quiz-options", quizOptions);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("An error occurred");
    });
});

module.exports = router;
