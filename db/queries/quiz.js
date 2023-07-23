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

const getNewestQuiz = function () {
  return db
    .query(
      `
  SELECT *
  FROM quizzes
  ORDER BY id DESC
  LIMIT 1;
  `
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
  WHERE quizzes.id = $1
  ORDER BY questions.id;
  `,
      [id]
    )
    .then((res) => {
      return res.rows || null;
    })
    .catch((err) => console.error(err.message));
};

const getQuizQuestion = function (id) {
  return db
    .query(
      `
  SELECT title, question, answer_id
  FROM questions
  WHERE questions.id = $1;
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
  SELECT options.id, options.description, questions.id as question_id
  FROM questions
  JOIN options ON questions.id = question_id
  WHERE questions.id = $1
  ORDER BY options.id;
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

const getOptionsWithQuestionId = (questionId) => {
  return db
    .query(`SELECT * FROM options WHERE question_id = $1`, [questionId])
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.error(err.message);
    });
};

const getAttemptsForUserID = function (userid) {
  return db
    .query(
      `
  SELECT quizzes.title, attempts.grade, users.name
  FROM attempts
  JOIN users ON attempts.user_id=users.id
  JOIN quizzes ON attempts.quiz_id=quizzes.id
  WHERE users.id = $1;
  `,
      [userid]
    )
    .then((res) => {
      console.log(res.rows);
      return res.rows;
    })
    .catch((err) => console.error(err.message));
};

module.exports = {
  getQuiz,
  getNewestQuiz,
  getQuizQuestions,
  getQuizQuestion,
  getAllPublicQuizzes,
  getQuestionsWithQuizId,
  getQuizQuestionsOptions,
  getOptionsWithQuestionId,
  getAttemptsForUserID,
};
