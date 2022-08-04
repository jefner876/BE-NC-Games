const { removeCommentByCommentId } = require("../models/comments.model");

exports.deleteCommentByCommentId = (req, res) => {
  const { comment_id: id } = req.params;
  removeCommentByCommentId(id).then(() => {
    res.sendStatus(204);
  });
};
