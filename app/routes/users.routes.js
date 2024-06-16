const {
  getAllUsers,
  findUserByUsername,
  createUser,
} = require("../controllers/Users.controller");

const { authenticateToken } = require("../middlewares/auth_functions");

const usersRouter = require("express").Router();

usersRouter.route("/").get(getAllUsers).post(createUser);
usersRouter
  .route("/username/:username")
  .get(authenticateToken, findUserByUsername);

module.exports = usersRouter;
