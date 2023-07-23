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

const addUserToDatabase = function(name,email,password) {
  return db
  .query(
  `INSERT INTO users(name, email, password)
  VALUES($1, $2, $3)
  RETURNING *`,
  [name, email, password]
  ).then(result => {
  console.log(result.rows);
  })
}

module.exports = { getUsers, getUserWithEmail, addUserToDatabase };
