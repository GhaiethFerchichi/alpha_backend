const {
  createParcour,
  getAllParcours,
  getParcourById,
  updateParcour,
  deleteParcour,
} = require("../controllers/Parcours.controller");

const parcoursRouter = require("express").Router();

parcoursRouter.route("/").get(getAllParcours).post(createParcour);

parcoursRouter
  .route("/:parcoursId")
  .get(getParcourById)
  .put(updateParcour)
  .delete(deleteParcour);

module.exports = parcoursRouter;
