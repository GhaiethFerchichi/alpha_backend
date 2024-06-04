const studentRouter = require("express").Router();

const {
  createEtudiant,
  getAllEtudiants,
  getEtudiantById,
  updateEtudiant,
  deleteEtudiant,
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

module.exports = studentRouter;
