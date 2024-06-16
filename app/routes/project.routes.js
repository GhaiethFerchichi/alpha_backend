const {
  getAllProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/Project.controller");

const projectRouter = requrie("express").Router();

projectRouter.route("/").get(getAllProjects).post(createProject);

projectRouter
  .route("/:projectId")
  .get(getProjectById)
  .put(updateProject)
  .delete(deleteProject);

module.exports = projectRouter;
