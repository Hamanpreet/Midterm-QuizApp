const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

const getAttemptsForUserID = function(userid) {
  return db
  .query(`
  SELECT quizzes.title, attempts.grade
  FROM attempts
  JOIN users ON attempts.user_id=users.id
  JOIN quizzes ON attempts.quiz_id=quizzes.id
  WHERE users.id = $1;
  `,[userid])
  .then(res => {
    console.log(res.rows);
    return res.rows;
  })
  .catch(err => console.error(err.message));
};

router.get('/', (req, res) => {
  const userID = req.session.userId;
  console.log(userID);
  getAttemptsForUserID(userID)
  .then((attempts) => {
   
    // Pass attempts data to the template
    res.render('attempts', {attempts});
  })
  .catch((err) => {
    console.error(err.message);
    res.status(500).send('An error occurred');
  });
});


module.exports = router;