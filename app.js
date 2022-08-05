const express = require("express");
const { getCategories } = require("./controllers/categories.controller");
const { accessInvalidRoute } = require("./controllers/all-routes.controller");
const {
  getReviewByID,
  patchReviewVoteById,
  getReviews,
  getCommentsByReviewID,
  postCommentByReviewID,
} = require("./controllers/reviews.controller");
const { getUsers } = require("./controllers/users.controller");
const {
  deleteCommentByCommentId,
} = require("./controllers/comments.controller");
const {
  handleCustomErrors,
  handlePSQLErrors,
  handleServerErrors,
} = require("./errors");
const { getAPIEndpoints } = require("./controllers/api.controller");

const app = express();
app.use(express.json());

app.get("/api", getAPIEndpoints);

app.get("/api/categories", getCategories);

app.get("/api/reviews", getReviews);
app.get("/api/reviews/:review_id", getReviewByID);
app.patch("/api/reviews/:review_id", patchReviewVoteById);

app.get("/api/reviews/:review_id/comments", getCommentsByReviewID);
app.post("/api/reviews/:review_id/comments", postCommentByReviewID);

app.get("/api/users", getUsers);

app.delete("/api/comments/:comment_id", deleteCommentByCommentId);

app.all("*", accessInvalidRoute);

// Error Handling
app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handleServerErrors);

module.exports = app;
