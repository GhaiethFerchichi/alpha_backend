const Formation = require("../models/Formation.model");
const Niveau_foramtion = require("../models/NiveauFormation.model");
const Type_Stage = require("../models/TypeStage.model");

/**
 * @swagger
 * tags:
 *   name: Niveau_formations
 *   description: Niveau formation management
 */

/**
 * @swagger
 * /niveau_formations:
 *   get:
 *     summary: Retrieve a list of niveau_formations
 *     tags: [Niveau_formations]
 *     responses:
 *       200:
 *         description: A list of niveau_formations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Niveau_foramtion'
 *       400:
 *         description: Bad request
 */
const getAllNiveauFormations = async (_, res) => {
  try {
    const niveau_formations = await Niveau_foramtion.findAll({
      include: [Formation, Type_Stage],
    });
    res.status(200).json({
      success: true,
      message: "Get all niveau_formations",
      data: niveau_formations,
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
 * /niveau_formations/{niveauFormationId}:
 *   get:
 *     summary: Get a niveau_formation by ID
 *     tags: [Niveau_formations]
 *     parameters:
 *       - in: path
 *         name: niveauFormationId
 *         schema:
 *           type: string
 *         required: true
 *         description: The niveau_formation ID
 *     responses:
 *       200:
 *         description: Successfully retrieved niveau_formation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Niveau_foramtion'
 *       404:
 *         description: Niveau_formation not found
 *       400:
 *         description: Bad request
 */
const getNiveauFormationById = async (req, res) => {
  const { niveauFormationId } = req.params;
  try {
    const niveau_formation = await Niveau_foramtion.findByPk(
      niveauFormationId,
      { include: [Formation, Type_Stage] }
    );
    if (!niveau_formation)
      return res.status(404).json({
        success: false,
        message: `Niveau_formation with id ${niveauFormationId} not found`,
      });

    res.status(200).json({
      success: true,
      message: `Get niveau_formation with id ${niveauFormationId}`,
      data: niveau_formation,
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
 * /niveau_formations:
 *   post:
 *     summary: Create a new niveau_formation
 *     tags: [Niveau_formations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code_niveau_fomation:
 *                 type: string
 *                 example: CODE123
 *               lib_niveau_fomation_ara:
 *                 type: string
 *                 example: 'مستوى التكوين'
 *               lib_niveau_fomation_fr:
 *                 type: string
 *                 example: 'Niveau de formation'
 *     responses:
 *       201:
 *         description: Niveau_formation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Niveau_foramtion'
 *       400:
 *         description: Bad request
 */
const createNiveauFormation = async (req, res) => {
  const { body } = req;
  try {
    const newNiveauFormation = await Niveau_foramtion.create({ ...body });

    const newNiveauFormationPopulated = await Niveau_foramtion.findByPk(
      newNiveauFormation.niveau_formation_id,
      { include: [Formation, Type_Stage] }
    );

    res.status(201).json({
      success: true,
      message: `New niveau_formation with id ${newNiveauFormation.niveau_formation_id} created`,
      data: newNiveauFormationPopulated,
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
 * /niveau_formations/{niveauFormationId}:
 *   delete:
 *     summary: Delete a niveau_formation by ID
 *     tags: [Niveau_formations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: niveauFormationId
 *         schema:
 *           type: string
 *         required: true
 *         description: The niveau_formation ID
 *     responses:
 *       200:
 *         description: Niveau_formation deleted successfully
 *       404:
 *         description: Niveau_formation not found
 *       400:
 *         description: Bad request
 */
const deleteNiveauFormation = async (req, res) => {
  const { niveauFormationId } = req.params;
  try {
    const niveau_formation = await Niveau_foramtion.findOne({
      where: { niveau_formation_id: niveauFormationId },
    });
    if (!niveau_formation)
      return res.status(404).json({
        success: false,
        message: `Niveau_formation with id ${niveauFormationId} not found`,
      });

    await Niveau_foramtion.destroy({
      where: { niveau_formation_id: niveauFormationId },
    });
    res.status(200).json({
      success: true,
      message: `Niveau_formation with id ${niveauFormationId} deleted`,
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
 * /niveau_formations/{niveauFormationId}:
 *   put:
 *     summary: Update a niveau_formation by ID
 *     tags: [Niveau_formations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: niveauFormationId
 *         schema:
 *           type: string
 *         required: true
 *         description: The niveau_formation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code_niveau_fomation:
 *                 type: string
 *               lib_niveau_fomation_ara:
 *                 type: string
 *               lib_niveau_fomation_fr:
 *                 type: string
 *     responses:
 *       200:
 *         description: Niveau_formation updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Niveau_foramtion'
 *       404:
 *         description: Niveau_formation not found
 *       400:
 *         description: Bad request
 */
const updateNiveauFormation = async (req, res) => {
  const { niveauFormationId } = req.params;
  const { body } = req;
  try {
    delete body.niveau_formation_id;
    const [updatedRows] = await Niveau_foramtion.update(
      { ...body },
      { where: { niveau_formation_id: niveauFormationId } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Niveau_formation with id ${niveauFormationId} not found or no changes made`,
      });
    }

    const updatedNiveauFormation = await Niveau_foramtion.findByPk(
      niveauFormationId,
      { include: [Formation, Type_Stage] }
    );

    res.status(200).json({
      success: true,
      message: `Niveau_formation with id ${niveauFormationId} updated`,
      data: updatedNiveauFormation,
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
  getAllNiveauFormations,
  getNiveauFormationById,
  createNiveauFormation,
  deleteNiveauFormation,
  updateNiveauFormation,
};
