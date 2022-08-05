const { getUsers } = require("../controllers/users.controller");

const usersRouter = require("express").Router();

usersRouter.get("/", getUsers);

module.exports = usersRouter;
