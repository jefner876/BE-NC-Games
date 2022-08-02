const express = require("express");
const { getCategories } = require("./controllers/categories.controller");
const { accessInvalidRoute } = require("./controllers/all-routes.controller");
const {
  getReviewByID,
  patchReviewVoteById,
} = require("./controllers/reviews.controller");
const {
  handleCustomErrors,
  handlePSQLErrors,
  handleServerErrors,
} = require("./errors");

const app = express();
app.use(express.json());

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewByID);
app.patch("/api/reviews/:review_id", patchReviewVoteById);

app.all("*", accessInvalidRoute);

// Error Handling
app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handleServerErrors);

module.exports = app;
