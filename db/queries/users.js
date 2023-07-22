const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUserWithEmail = function(email) {
  return db
  .query(`
  SELECT *
  FROM users
  WHERE users.email = $1;
  `,[email])
  .then(res => {
    console.log(res.rows);
    return res.rows[0] || null;
  })
  .catch(err => console.error(err.message));
};

module.exports = { getUsers, getUserWithEmail };
