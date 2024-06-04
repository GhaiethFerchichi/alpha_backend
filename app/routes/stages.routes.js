const stageRouter = require("express").Router();
const {
  getAllStages,
  getStageById,
  createStage,
  deleteStage,
  updateStage,
} = require("../controllers/Stage.controller");
const { authenticateToken } = require("../middlewares/auth_functions");

stageRouter.route("/").get(getAllStages).post(authenticateToken, createStage);

stageRouter
  .route("/:stageId")
  .get(getStageById)
  .put(authenticateToken, updateStage)
  .delete(authenticateToken, deleteStage);
module.exports = stageRouter;
