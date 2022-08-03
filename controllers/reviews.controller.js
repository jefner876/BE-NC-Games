const {
  fetchReviewById,
  updateReviewVotesById,
  fetchReviews,
  fetchCommentsByReviewID,
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
      if (comments.length === 0) {
        fetchReviewById(id)
          .then(() => {
            res.status(200).send({ comments });
          })
          .catch(next);
      } else {
        res.status(200).send({ comments });
      }
    })
    .catch(next);
};
