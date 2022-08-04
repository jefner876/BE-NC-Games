const db = require("../db/connection");

exports.removeCommentByCommentId = (id) => {
  return db
    .query(
      `
  DELETE FROM comments 
  WHERE comment_id =$1`,
      [id]
    )
    .then(({ rowCount }) => {
      if (rowCount === 0) {
        return Promise.reject({ status: 404, msg: "Comment_id Not Found" });
      }
      return rowCount;
    });
};
