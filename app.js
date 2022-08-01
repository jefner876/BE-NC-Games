const express = require("express");
const { getCategories } = require("./controllers/categories.controller");
const { accessInvalidRoute } = require("./controllers/all-routes.controller");
const { handleCustomErrors, handleServerErrors } = require("./errors");

const app = express();

app.get("/api/categories", getCategories);

app.all("*", accessInvalidRoute);

// Error Handling
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
