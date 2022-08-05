const express = require("express");
const apiRouter = require("./routes/api.router.js");
const categoriesRouter = require("./routes/categories.router");
const { accessInvalidRoute } = require("./controllers/all-routes.controller");
const {
  getReviewByID,
  patchReviewVoteById,
  getReviews,
  getCommentsByReviewID,
  postCommentByReviewID,
} = require("./controllers/reviews.controller");

const {
  handleCustomErrors,
  handlePSQLErrors,
  handleServerErrors,
} = require("./errors");
const usersRouter = require("./routes/users.router.js");
const commentsRouter = require("./routes/comments.router.js");
const reviewsRouter = require("./routes/api.reviews.js");

const app = express();
app.use(express.json());

app.use("/api", apiRouter);

app.use("/api/categories", categoriesRouter);

app.use("/api/reviews", reviewsRouter);

app.use("/api/users", usersRouter);

app.use("/api/comments", commentsRouter);

app.all("*", accessInvalidRoute);

// Error Handling
app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handleServerErrors);

module.exports = app;
