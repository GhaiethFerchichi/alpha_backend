const {
  getAllEtudiantStages,
  createEtudiantStage,
  getEtudiantStageById,
  updateEtudiantStage,
  deleteEtudiantStage,
} = require("../controllers/EtudiantStage.controller");

const etudiantStageRouter = require("express").Router();

etudiantStageRouter
  .route("/")
  .get(getAllEtudiantStages)
  .post(createEtudiantStage);

etudiantStageRouter
  .route("/:etudiantStageId")
  .get(getEtudiantStageById)
  .put(updateEtudiantStage)
  .delete(deleteEtudiantStage);

module.exports = etudiantStageRouter;
