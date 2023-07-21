const db = require("../connection");

const getQuiz = function (id) {
  return db
    .query(
      `
  SELECT quizzes.title as title, questions.id, quizzes.description, quizzes.private,questions.title as question_title, questions.question
  FROM questions
  JOIN quizzes ON quizzes.id = quiz_id
  WHERE quizzes.id = $1;
  `,
      [id]
    )
    .then((res) => {
      return res.rows || null;
    })
    .catch((err) => console.error(err.message));
};

module.exports = { getQuiz };
