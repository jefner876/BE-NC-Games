const { getAPIEndpoints } = require("../controllers/api.controller");

const apiRouter = require("express").Router();

apiRouter.get("/", getAPIEndpoints);

module.exports = apiRouter;
