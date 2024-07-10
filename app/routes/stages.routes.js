const stageRouter = require("express").Router();
const {
  getAllStages,
  getStageById,
  createStage,
  deleteStage,
  updateStage,
  getStageByIDEtudiantFormatted,
} = require("../controllers/Stage.controller");

const { authenticateToken } = require("../middlewares/auth_functions");

stageRouter.route("/").get(getAllStages).post(createStage);

stageRouter
  .route("/:stageId")
  .get(getStageById)
  .put(updateStage)
  .delete(deleteStage);

stageRouter.route("/formatted/:stage_id").get(getStageByIDEtudiantFormatted);
module.exports = stageRouter;
