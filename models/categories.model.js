const db = require("../db/connection");

exports.fetchCategories = (req, res) => {
  return db.query("SELECT * FROM categories;").then(({ rows: categories }) => {
    return categories;
  });
};
