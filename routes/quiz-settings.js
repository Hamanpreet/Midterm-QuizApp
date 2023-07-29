const express = require("express");
const router = express.Router();
const quizQueries = require("../db/queries/quiz");
const updateTable = require("../db/queries/updateTable");

router.get("/", (req, res) => {
  user = req.session.user;
  if (!user) {
    return res.status(404).send({ error: "You are not signed in" });
  }
  updateTable.createQuiz(user.id).then(() => {
    quizQueries.getNewestQuiz().then((quiz) => {
      res.redirect("/quiz-settings/" + quiz.id);
    });
  });
});

router.get("/:id", (req, res) => {
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
          const quizInfo = { quiz, quizQuestions, user };
          res.render("quiz-settings", quizInfo);
        });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("An error occurred");
    });
});

router.post("/:id", (req, res) => {
  let { title, description } = req.body;
  let private = false;
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

router.post("/:id/new-question", (req, res) => {
  updateTable
    .createQuizQuestion(req.session.quiz_id)
    .then(() => {
      res.redirect("/quiz-settings/" + req.session.quiz_id);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("An error occurred");
    });
});

router.post("/:id/delete-question", (req, res) => {
  updateTable
    .deleteQuizQuestion(req.params.id)
    .then(() => {
      res.redirect("/quiz-settings/" + req.session.quiz_id);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("An error occurred");
    });
});

router.post("/:id/delete-quiz", (req, res) => {
  console.log(req.params.id);
  updateTable
    .deleteQuiz(req.params.id)
    .then(() => {
      res.redirect("/quizzes");
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("An error occurred");
    });
});

module.exports = router;
