const studentRouter = require("express").Router();

const {
  createEtudiant,
  getAllEtudiants,
  getEtudiantById,
  updateEtudiant,
  deleteEtudiant,
  getClasseEtudiants,
} = require("../controllers/Etudiant.controller");
const { authenticateToken } = require("../middlewares/auth_functions");

studentRouter
  .route("/")
  .get(getAllEtudiants)
  .post(authenticateToken, createEtudiant);

studentRouter
  .route("/:etudiantId")
  .get(getEtudiantById)
  .put(authenticateToken, updateEtudiant)
  .delete(authenticateToken, deleteEtudiant);

studentRouter.route("/classe/:classeId").get(getClasseEtudiants);

module.exports = studentRouter;
