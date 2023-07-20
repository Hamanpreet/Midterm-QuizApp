const express = require('express');
const router  = express.Router();
const database = require("../db/queries/users.js");


router.get('/', (req, res) => {
  res.render('register');
});

module.exports = router;