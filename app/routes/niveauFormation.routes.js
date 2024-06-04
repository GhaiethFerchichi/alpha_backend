const {
  getAllNiveauFormations,
  createNiveauFormation,
  getNiveauFormationById,
  updateNiveauFormation,
  deleteNiveauFormation,
} = require("../controllers/NiveaFormation.controller");

const niveauFormation = require("express").Router();

niveauFormation
  .route("/")
  .get(getAllNiveauFormations)
  .post(createNiveauFormation);

niveauFormation
  .route("/:niveauFormationId")
  .get(getNiveauFormationById)
  .put(updateNiveauFormation)
  .delete(deleteNiveauFormation);

module.exports = niveauFormation;
