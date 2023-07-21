const db = require('./connection');

const getAllPublicQuizzes = () => {
  return db
  .query(`
  SELECT *
  FROM quizzes
  WHERE private = 'false';
  `)
  .then(res => {
    return res.rows;
  })
  .catch(err => console.error(err.message));
};

module.exports = { getAllPublicQuizzes }
