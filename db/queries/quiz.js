const db = require("../connection");

const getQuiz = function (id) {
  return db
    .query(
      `
  SELECT *
  FROM quizzes
  WHERE quizzes.id = $1;
  `,
      [id]
    )
    .then((res) => {
      return res.rows[0] || null;
    })
    .catch((err) => console.error(err.message));
};

const getQuizQuestions = function (id) {
  return db
    .query(
      `
  SELECT questions.title as title, questions.id as id, questions.question
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

const getQuizQuestionsOptions = function (id) {
  return db
    .query(
      `
  SELECT options.id, options.description, questions.id as question_id, questions.title
  FROM questions
  JOIN options ON questions.id = question_id
  WHERE questions.id = $1;
  `,
      [id]
    )
    .then((res) => {
      return res.rows || null;
    })
    .catch((err) => console.error(err.message));
};

const getAllPublicQuizzes = () => {
  return db
    .query(
      `
  SELECT *
  FROM quizzes
  WHERE private = 'false';
  `
    )
    .then((res) => {
      return res.rows;
    })
    .catch((err) => console.error(err.message));
};

const getQuestionsWithQuizId = (quizId) => {
  return db
    .query(
      `
  SELECT *
  FROM questions
  WHERE quiz_Id = $1`,
      [quizId]
    )
    .then((res) => {
      return res.rows;
    })
    .catch((err) => console.error(err.message));
};

module.exports = {
  getQuiz,
  getQuizQuestions,
  getAllPublicQuizzes,
  getQuestionsWithQuizId,
  getQuizQuestionsOptions,
};
