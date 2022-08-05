const {
  getReviews,
  getReviewByID,
  patchReviewVoteById,
  getCommentsByReviewID,
  postCommentByReviewID,
} = require("../controllers/reviews.controller");

const reviewsRouter = require("express").Router();

reviewsRouter.route("/").get(getReviews);

reviewsRouter
  .route("/:review_id")
  .get(getReviewByID)
  .patch(patchReviewVoteById);

reviewsRouter
  .route("/:review_id/comments")
  .get(getCommentsByReviewID)
  .post(postCommentByReviewID);

module.exports = reviewsRouter;
