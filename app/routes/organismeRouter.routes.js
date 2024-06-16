const {
  getAllOrganismes,
  createOrganisme,
  getOrganismeById,
  updateOrganisme,
  deleteOrganisme,
} = require("../controllers/Organisme.controller");

const organismeRouter = require("express").Router();

organismeRouter.route("/").get(getAllOrganismes).post(createOrganisme);

organismeRouter
  .route("/:organismeId")
  .get(getOrganismeById)
  .put(updateOrganisme)
  .delete(deleteOrganisme);

module.exports = organismeRouter;
