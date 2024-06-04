const supervisorRouter = require("express").Router();
const {
  getAllSupervisors,
  getSupervisorById,
  createSupervisor,
  deleteSupervisor,
  updateSupervisor,
} = require("../controllers/Supervisor.controller");
const { authenticateToken } = require("../middlewares/auth_functions");

supervisorRouter
  .route("/")
  .get(getAllSupervisors)
  .post(authenticateToken, createSupervisor);

supervisorRouter
  .route("/:supervisorId")
  .get(getSupervisorById)
  .put(authenticateToken, updateSupervisor)
  .delete(authenticateToken, deleteSupervisor);

module.exports = supervisorRouter;
