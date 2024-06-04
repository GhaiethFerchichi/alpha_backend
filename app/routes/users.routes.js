const {
  findAllUsers,
  findUserByUsername,
  createUser,
} = require("../controllers/Users.controller");

const { authenticateToken } = require("../middlewares/auth_functions");

const usersRouter = require("express").Router();

usersRouter.route("/").get(findAllUsers).post(createUser);
usersRouter
  .route("/username/:username")
  .get(authenticateToken, findUserByUsername);

module.exports = usersRouter;
