const {
  getAllAnneesUniversitaires,
  createAnneeUniversitaire,
  getAnneeUniversitaireById,
  updateAnneeUniversitaire,
  deleteAnneeUniversitaire,
} = require("../controllers/AnneeUniversitaire.controller");

const anneeUniversitaireRouter = require("express").Router();

anneeUniversitaireRouter
  .route("/")
  .get(getAllAnneesUniversitaires)
  .post(createAnneeUniversitaire);

anneeUniversitaireRouter
  .route("/:anneeUniversitaireId")
  .get(getAnneeUniversitaireById)
  .put(updateAnneeUniversitaire)
  .delete(deleteAnneeUniversitaire);

module.exports = anneeUniversitaireRouter;
