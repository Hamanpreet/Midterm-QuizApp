const express = require('express');
const router  = express.Router();
const database = require("../db/queries/quiz");

router.get('/:userId', (req, res) => {
  // Get the userId from the URL parameter
  const userID = req.params.userId || req.session.userId;
  console.log(userID);
  database.getAttemptsForUserID(userID)
  .then((attempts) => {
    const user = req.session.user;
    // Pass attempts data to the template
    res.render('attempts', {attempts, user});
  })
  .catch((err) => {
    console.error(err.message);
    res.status(500).send('An error occurred');
  });
});


module.exports = router;