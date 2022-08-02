const {
  fetchReviewById,
  updateReviewVotesById,
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
