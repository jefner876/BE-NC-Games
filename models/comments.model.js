const db = require("../db/connection");

exports.removeCommentByCommentId = (id) => {
  return db
    .query(
      `
  DELETE FROM comments 
  WHERE comment_id =$1`,
      [id]
    )
    .then((result) => {
      return result;
    });
};
