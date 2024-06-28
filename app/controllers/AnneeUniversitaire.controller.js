const Annee_Universitaire = require("../models/AnneeUniversitaire.model");

/**
 * @swagger
 * tags:
 *   name: Annees_Universitaires
 *   description: University Year management
 */

/**
 * @swagger
 * /annees_universitaires:
 *   get:
 *     summary: Retrieve a list of university years
 *     tags: [Annees_Universitaires]
 *     responses:
 *       200:
 *         description: A list of university years
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Annee_Universitaire'
 *       400:
 *         description: Bad request
 */
const getAllAnneesUniversitaires = async (_, res) => {
  try {
    const anneesUniversitaires = await Annee_Universitaire.findAll();
    res.status(200).json({
      success: true,
      message: "Get all university years",
      data: anneesUniversitaires,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Contact your administrator",
      error,
    });
  }
};

/**
 * @swagger
 * /annees_universitaires/{anneeUniversitaireId}:
 *   get:
 *     summary: Get a university year by ID
 *     tags: [Annees_Universitaires]
 *     parameters:
 *       - in: path
 *         name: anneeUniversitaireId
 *         schema:
 *           type: string
 *         required: true
 *         description: The university year ID
 *     responses:
 *       200:
 *         description: Successfully retrieved university year
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Annee_Universitaire'
 *       404:
 *         description: University year not found
 *       400:
 *         description: Bad request
 */
const getAnneeUniversitaireById = async (req, res) => {
  const { anneeUniversitaireId } = req.params;
  try {
    const anneeUniversitaire = await Annee_Universitaire.findByPk(
      anneeUniversitaireId
    );
    if (!anneeUniversitaire)
      return res.status(404).json({
        success: false,
        message: `University year with id ${anneeUniversitaireId} not found`,
      });

    res.status(200).json({
      success: true,
      message: `Get university year with id ${anneeUniversitaireId}`,
      data: anneeUniversitaire,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Contact your administrator",
      error,
    });
  }
};

/**
 * @swagger
 * /annees_universitaires:
 *   post:
 *     summary: Create a new university year
 *     tags: [Annees_Universitaires]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               annee_universitaire:
 *                 type: string
 *                 example: "2023-2024"
 *     responses:
 *       201:
 *         description: University year created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Annee_Universitaire'
 *       400:
 *         description: Bad request
 */
const createAnneeUniversitaire = async (req, res) => {
  const { body } = req;
  try {
    const newAnneeUniversitaire = await Annee_Universitaire.create({ ...body });
    res.status(201).json({
      success: true,
      message: `New university year created with id ${newAnneeUniversitaire.annee_universitaire_id}`,
      data: newAnneeUniversitaire,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Contact your administrator",
      error,
    });
  }
};

/**
 * @swagger
 * /annees_universitaires/{anneeUniversitaireId}:
 *   delete:
 *     summary: Delete a university year by ID
 *     tags: [Annees_Universitaires]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: anneeUniversitaireId
 *         schema:
 *           type: string
 *         required: true
 *         description: The university year ID
 *     responses:
 *       200:
 *         description: University year deleted successfully
 *       404:
 *         description: University year not found
 *       400:
 *         description: Bad request
 */
const deleteAnneeUniversitaire = async (req, res) => {
  const { anneeUniversitaireId } = req.params;
  try {
    const anneeUniversitaire = await Annee_Universitaire.findOne({
      where: { annee_universitaire_id: anneeUniversitaireId },
    });
    if (!anneeUniversitaire)
      return res.status(404).json({
        success: false,
        message: `University year with id ${anneeUniversitaireId} not found`,
      });

    await Annee_Universitaire.destroy({
      where: { annee_universitaire_id: anneeUniversitaireId },
    });
    res.status(200).json({
      success: true,
      message: `University year with id ${anneeUniversitaireId} deleted`,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Contact your administrator",
      error,
    });
  }
};

/**
 * @swagger
 * /annees_universitaires/{anneeUniversitaireId}:
 *   put:
 *     summary: Update a university year by ID
 *     tags: [Annees_Universitaires]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: anneeUniversitaireId
 *         schema:
 *           type: string
 *         required: true
 *         description: The university year ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               annee_universitaire:
 *                 type: string
 *     responses:
 *       200:
 *         description: University year updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Annee_Universitaire'
 *       404:
 *         description: University year not found
 *       400:
 *         description: Bad request
 */
const updateAnneeUniversitaire = async (req, res) => {
  const { anneeUniversitaireId } = req.params;
  const { body } = req;
  try {
    delete body.annee_universitaire_id;
    const [updatedRows] = await Annee_Universitaire.update(
      { ...body },
      { where: { annee_universitaire_id: anneeUniversitaireId } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `University year with id ${anneeUniversitaireId} not found or no changes made`,
      });
    }

    const updatedAnneeUniversitaire = await Annee_Universitaire.findByPk(
      anneeUniversitaireId
    );
    res.status(200).json({
      success: true,
      message: `University year with id ${anneeUniversitaireId} updated`,
      data: updatedAnneeUniversitaire,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Contact your administrator",
      error,
    });
  }
};

module.exports = {
  getAllAnneesUniversitaires,
  getAnneeUniversitaireById,
  createAnneeUniversitaire,
  deleteAnneeUniversitaire,
  updateAnneeUniversitaire,
};
