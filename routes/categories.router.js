const { getCategories } = require("../controllers/categories.controller");

const categoriesRouter = require("express").Router();

categoriesRouter.get("/", getCategories);

module.exports = categoriesRouter;
