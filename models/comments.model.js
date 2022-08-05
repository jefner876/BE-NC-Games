const db = require("../db/connection");

exports.removeCommentByCommentId = (id) => {
  return db
    .query(
      `
  DELETE FROM comments 
  WHERE comment_id =$1 RETURNING*;`,
      [id]
    )
    .then((resp) => {
      const {
        rowCount,
        rows: [deletedComment],
      } = resp;

      if (rowCount === 0) {
        return Promise.reject({ status: 404, msg: "Comment_id Not Found" });
      }
      //   console.log({ deletedCommentID: deletedComment.comment_id });
      return rowCount;
    });
};
