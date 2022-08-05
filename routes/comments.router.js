const {
  deleteCommentByCommentId,
} = require("../controllers/comments.controller");

const commentsRouter = require("express").Router();

commentsRouter.delete("/:comment_id", deleteCommentByCommentId);

module.exports = commentsRouter;
