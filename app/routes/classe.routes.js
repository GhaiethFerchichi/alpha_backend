const {
  getAllClasses,
  createClass,
  getClassById,
  updateClass,
  deleteClass,
} = require("../controllers/Classe.controller");

const classeRouter = require("express").Router();

classeRouter.route("/").get(getAllClasses).post(createClass);

classeRouter
  .route("/:classe_id")
  .get(getClassById)
  .put(updateClass)
  .delete(deleteClass);

module.exports = classeRouter;
