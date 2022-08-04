const {
  fetchReviewById,
  updateReviewVotesById,
  fetchReviews,
  fetchCommentsByReviewID,
  addCommentByReviewID,
} = require("../models/reviews.model");

exports.getReviewByID = (req, res, next) => {
  const { review_id: id } = req.params;
  fetchReviewById(id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch(next);
};

exports.patchReviewVoteById = (req, res, next) => {
  const { inc_votes } = req.body;
  const { review_id: id } = req.params;
  updateReviewVotesById(inc_votes, id)
    .then((updatedReview) => {
      res.status(200).send({ updatedReview });
    })
    .catch(next);
};

exports.getReviews = (req, res) => {
  fetchReviews().then((reviews) => {
    res.status(200).send({ reviews });
  });
};

exports.getCommentsByReviewID = (req, res, next) => {
  const { review_id: id } = req.params;
  fetchCommentsByReviewID(id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postCommentByReviewID = (req, res, next) => {
  const { review_id: id } = req.params;
  const { username: author, body } = req.body;

  addCommentByReviewID(body, id, author)
    .then((postedComment) => {
      res.status(201).send({ postedComment });
    })
    .catch(next);
};
