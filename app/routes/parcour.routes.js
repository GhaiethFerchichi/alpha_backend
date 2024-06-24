const {
  createParcour,
  getAllParcours,
  getParcourById,
  updateParcour,
  deleteParcour,
} = require("../controllers/Parcour.controller");

const parcourRouter = require("express").Router();

parcourRouter.route("/").get(getAllParcours).post(createParcour);

parcourRouter
  .route("/:parcourId")
  .get(getParcourById)
  .put(updateParcour)
  .delete(deleteParcour);

module.exports = parcourRouter;
