const {
  getAllUserTypes,
  createUserType,
  getUserTypeById,
  updateUserType,
  deleteUserType,
} = require("../controllers/UserType.controller");

const userTypeRouter = require("express").Router();

userTypeRouter.route("/").get(getAllUserTypes).post(createUserType);

userTypeRouter
  .route("/:userTypeId")
  .get(getUserTypeById)
  .put(updateUserType)
  .delete(deleteUserType);

module.exports = userTypeRouter;
