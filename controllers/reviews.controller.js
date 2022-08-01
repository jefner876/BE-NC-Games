const { fetchReviewById } = require("../models/reviews.model");

exports.getReviewByID = (req, res) => {
  const { review_id: id } = req.params;
  fetchReviewById(id).then((review) => {
    res.status(200).send({ review });
  });
};
