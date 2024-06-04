const {
  getAllFormations,
  createFormation,
  getFormationById,
  updateFormation,
  deleteFormation,
} = require("../controllers/Fromation.controller");

const formationRouter = require("express").Router();

formationRouter.route("/").get(getAllFormations).post(createFormation);
formationRouter
  .route("/:formationId")
  .get(getFormationById)
  .put(updateFormation)
  .delete(deleteFormation);

module.exports = formationRouter;
