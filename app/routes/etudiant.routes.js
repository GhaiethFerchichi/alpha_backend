const etudiantRouter = require("express").Router();

const {
  createEtudiant,
  getAllEtudiants,
  getEtudiantById,
  updateEtudiant,
  deleteEtudiant,
  getClasseEtudiants,
} = require("../controllers/Etudiant.controller");
const { authenticateToken } = require("../middlewares/auth_functions");

etudiantRouter.route("/").get(getAllEtudiants).post(createEtudiant);

etudiantRouter
  .route("/:etudiantId")
  .get(getEtudiantById)
  .put(updateEtudiant)
  .delete(deleteEtudiant);

etudiantRouter.route("/classe/:classeId").get(getClasseEtudiants);

module.exports = etudiantRouter;
