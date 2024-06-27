const {
  createParcour,
  getAllParcours,
  getParcourById,
  updateParcour,
  deleteParcour,
} = require("../controllers/Parcour.controller");

const parcoursRouter = require("express").Router();

parcoursRouter.route("/").get(getAllParcours).post(createParcour);

parcoursRouter
  .route("/:parcourId")
  .get(getParcourById)
  .put(updateParcour)
  .delete(deleteParcour);

module.exports = parcoursRouter;
