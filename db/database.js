const db = require('./connection');

const getAllPublicQuizzes = () => {
  return db
  .query(`
  SELECT *
  FROM quizzes
  WHERE private = 'false';
  `)
  .then(res => {
    console.log(res.rows);
    return res.rows || null;
  })
  .catch(err => console.error(err.message));
};

module.exports = { getAllPublicQuizzes }
