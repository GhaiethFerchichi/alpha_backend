const encadrantRouter = require("express").Router();
const {
  getAllEncadrants,
  createEncadrant,
  getEncadrantById,
  updateEncadrant,
  deleteEncadrant,
} = require("../controllers/Encadrant.controller");
const { authenticateToken } = require("../middlewares/auth_functions");

encadrantRouter
  .route("/")
  .get(getAllEncadrants)
  .post(authenticateToken, createEncadrant);

encadrantRouter
  .route("/:encadrantId")
  .get(getEncadrantById)
  .put(authenticateToken, updateEncadrant)
  .delete(authenticateToken, deleteEncadrant);

module.exports = encadrantRouter;
