const db = require("../db/connection");

exports.fetchReviewById = (id) => {
  return db
    .query("SELECT * FROM reviews WHERE review_id = $1", [id])
    .then(({ rows: [review] }) => {
      if (!review) {
        return Promise.reject({ status: 404, msg: "Review_ID Not Found" });
      }
      return review;
    });
};

exports.updateReviewVotesById = (inc_votes, id) => {
  return db
    .query(
      `UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING*;`,
      [inc_votes, id]
    )
    .then(({ rows: [updatedReview] }) => {
      if (!updatedReview) {
        return Promise.reject({ status: 404, msg: "Review_ID Not Found" });
      }
      return updatedReview;
    });
};
