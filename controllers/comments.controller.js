const { removeCommentByCommentId } = require("../models/comments.model");

exports.deleteCommentByCommentId = (req, res, next) => {
  const { comment_id: id } = req.params;
  removeCommentByCommentId(id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};
