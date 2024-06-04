const {
  getAllTypeStages,
  createTypeStage,
  getTypeStageById,
  updateTypeStage,
  deleteTypeStage,
} = require("../controllers/TypeStage.controller");

const typeStageRouter = require("express").Router();

typeStageRouter.route("/").get(getAllTypeStages).post(createTypeStage);
typeStageRouter
  .route("/:Type_Stage_id")
  .get(getTypeStageById)
  .put(updateTypeStage)
  .delete(deleteTypeStage);

module.exports = typeStageRouter;
