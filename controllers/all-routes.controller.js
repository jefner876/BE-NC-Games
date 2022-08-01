exports.accessInvalidRoute = (req, res, next) => {
  return Promise.reject({
    status: 404,
    msg: "Route Not Found",
  }).catch(next);
};
