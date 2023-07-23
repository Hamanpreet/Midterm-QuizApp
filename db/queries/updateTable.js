const db = require("../connection");

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

module.exports = {
  updateQuizTitle,
  updateQuizDescription,
  updateQuizPrivacy,
};
