const express = require('express');
const router  = express.Router();
const database = require("../db/queries/quiz");

router.get('/:userId?', (req, res) => {
  // Get the userId from the URL parameter or from the session
  const userID = req.session.user ? req.session.user.id : req.params.userId;
  
  database.getAttemptsForUserID(userID)
  .then((attempts) => {
    console.log(attempts);
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