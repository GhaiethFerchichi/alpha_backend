const {
  getAllUsers,
  findUserByUsername,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/Users.controller");

const { authenticateToken } = require("../middlewares/auth_functions");

const usersRouter = require("express").Router();

usersRouter.route("/").get(getAllUsers).post(createUser);
usersRouter
  .route("/username/:username")
  .get(authenticateToken, findUserByUsername);

usersRouter
  .route("/:userId")
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);
module.exports = usersRouter;
