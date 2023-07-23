const express = require('express');
const router  = express.Router();

const database = require("../db/queries/quiz");

// show a particular quiz questions
router.get("/:id", (req, res) => {
  database.getQuestionsWithQuizId(req.params.id)
    .then((questions) => {
      // Fetch options for all questions concurrently using Promise.all
      const optionsPromises = questions.map((question) => {
        return database.getOptionsWithQuestionId(question.id);
      });

      // Wait for all options to be fetched before proceeding
      return Promise.all(optionsPromises)
        .then((options) => {
          const user = req.session.user;
          const templateVars = { questions, options,user };
          res.render("questions", templateVars);
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


module.exports = router;
