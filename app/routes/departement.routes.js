const {
  getAllDepartements,
  createDepartement,
  getDepartementById,
  updateDepartement,
  deleteDepartement,
} = require("../controllers/Departement.controller");

const departementRouter = require("express").Router();

departementRouter.route("/").get(getAllDepartements).post(createDepartement);

departementRouter
  .route("/:departementId")
  .get(getDepartementById)
  .put(updateDepartement)
  .delete(deleteDepartement);

module.exports = departementRouter;
