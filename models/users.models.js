const db = require("../db/connection");

exports.fetchUsers = (req, res) => {
  return db.query("SELECT * FROM users;").then(({ rows: users }) => {
    return users;
  });
};
