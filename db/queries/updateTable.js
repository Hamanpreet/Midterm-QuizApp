const db = require("../connection");

const createQuiz = function (id) {
  return db
    .query(
      `
      INSERT INTO quizzes (owner_id, title) VALUES ($1, 'untitled');
  `,
      [id]
    )
    .catch((err) => console.error(err.message));
};

const updateQuizTitle = function (title, id) {
  return db
    .query(
      `
      UPDATE quizzes SET title = $1 WHERE id = $2;
  `,
      [title, id]
    )
    .catch((err) => console.error(err.message));
};

const updateQuizDescription = function (description, id) {
  return db
    .query(
      `
      UPDATE quizzes SET description = $1 WHERE id = $2;
  `,
      [description, id]
    )
    .catch((err) => console.error(err.message));
};

const updateQuizPrivacy = function (private, id) {
  return db
    .query(
      `
      UPDATE quizzes SET private = $1 WHERE id = $2;
  `,
      [private, id]
    )
    .catch((err) => console.error(err.message));
};

const createQuizQuestion = function (id) {
  return db
    .query(
      `
      INSERT INTO questions (quiz_id, title, question, answer_id) VALUES ($1, 'untitled','new option', 0);
  `,
      [id]
    )
    .catch((err) => console.error(err.message));
};

const deleteQuiz = function (id) {
  return db
    .query(
      `
      DELETE FROM quizzes WHERE id = $1;
  `,
      [id]
    )
    .catch((err) => console.error(err.message));
};

const deleteQuizQuestion = function (id) {
  return db
    .query(
      `
      DELETE FROM questions WHERE id = $1;
  `,
      [id]
    )
    .catch((err) => console.error(err.message));
};

const updateQuestionTitle = function (title, id) {
  return db
    .query(
      `
      UPDATE questions SET title = $1 WHERE id = $2;
  `,
      [title, id]
    )
    .catch((err) => console.error(err.message));
};

const updateQuestionQuestion = function (question, id) {
  return db
    .query(
      `
      UPDATE questions SET question = $1 WHERE id = $2;
  `,
      [question, id]
    )
    .catch((err) => console.error(err.message));
};

const createQuizOption = function (id) {
  return db
    .query(
      `
      INSERT INTO options (question_id, description) VALUES ($1, 'New possible answer');
  `,
      [id]
    )
    .catch((err) => console.error(err.message));
};

const deleteQuizOption = function (id) {
  return db
    .query(
      `
      DELETE FROM options WHERE id = $1;
  `,
      [id]
    )
    .catch((err) => console.error(err.message));
};

const updateOptionText = function (text, id) {
  return db
    .query(
      `
      UPDATE options SET description = $1 WHERE id = $2;
  `,
      [text, id]
    )
    .catch((err) => console.error(err.message));
};

const updateQuestionAnswer = function (answerId, QuestionId) {
  return db
    .query(
      `
      UPDATE questions SET answer_ID = $1 WHERE id = $2;
  `,
      [answerId, QuestionId]
    )
    .catch((err) => console.error(err.message));
};

module.exports = {
  createQuiz,
  updateQuizTitle,
  updateQuizDescription,
  updateQuizPrivacy,
  deleteQuiz,
  deleteQuizQuestion,
  createQuizQuestion,
  updateQuestionTitle,
  updateQuestionQuestion,
  createQuizOption,
  deleteQuizOption,
  updateOptionText,
  updateQuestionAnswer,
};
