exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.handlePSQLErrors = (err, req, res, next) => {
  const badRequestCodes = ["22P02", "23502"];
  const notFoundCodes = ["23503"];
  if (badRequestCodes.includes(err.code)) {
    res.status(400).send({ msg: "Bad Request" });
  } else if (notFoundCodes.includes(err.code)) {
    if (err.detail.includes("author")) err.msg = "Username Not Found";
    else if (err.detail.includes("review_id")) err.msg = "Review_ID Not Found";
    else err.msg = "Not Found";
    res.status(404).send({ msg: err.msg });
  } else next(err);
};

exports.handleServerErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};
