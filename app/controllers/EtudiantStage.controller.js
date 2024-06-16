const EtudiantStage = require("../models/EtudiantStage.model");
const Etudiant = require("../models/Etudiant.model");
const Stage = require("../models/Stage.model");

/**
 * @swagger
 * tags:
 *   name: EtudiantStages
 *   description: EtudiantStage management
 */

/**
 * @swagger
 * /etudiantStages:
 *   get:
 *     summary: Retrieve a list of etudiant stages
 *     tags: [EtudiantStages]
 *     responses:
 *       200:
 *         description: A list of etudiant stages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EtudiantStage'
 *       400:
 *         description: Bad request
 */
const getAllEtudiantStages = async (_, res) => {
  try {
    const etudiantStages = await EtudiantStage.findAll({
      include: [Stage, Etudiant],
    });

    res.status(200).json({
      success: true,
      message: "Get all etudiant stages",
      data: etudiantStages,
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
 * /etudiantStages/{etudiantStageId}:
 *   get:
 *     summary: Get a etudiant stage by ID
 *     tags: [EtudiantStages]
 *     parameters:
 *       - in: path
 *         name: etudiantStageId
 *         schema:
 *           type: string
 *         required: true
 *         description: The etudiant stage ID
 *     responses:
 *       200:
 *         description: Successfully retrieved etudiant stage
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EtudiantStage'
 *       404:
 *         description: Etudiant stage not found
 *       400:
 *         description: Bad request
 */
const getEtudiantStageById = async (req, res) => {
  const { etudiantStageId } = req.params;
  try {
    const etudiantStage = await EtudiantStage.findByPk(etudiantStageId);
    if (!etudiantStage) {
      return res.status(404).json({
        success: false,
        message: `EtudiantStage with id ${etudiantStageId} not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: `Get etudiant stage with id ${etudiantStageId}`,
      data: etudiantStage,
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
 * /etudiantStages:
 *   post:
 *     summary: Create a new etudiant stage
 *     tags: [EtudiantStages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               etudiant_id:
 *                 type: string
 *               stage_id:
 *                 type: string
 *               date_debut:
 *                 type: string
 *                 format: date
 *               date_fin:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Etudiant stage created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EtudiantStage'
 *       400:
 *         description: Bad request
 */
const createEtudiantStage = async (req, res) => {
  const { body } = req;
  try {
    const newEtudiantStage = await EtudiantStage.create({ ...body });
    res.status(201).json({
      success: true,
      message: `New etudiant stage with id ${newEtudiantStage.etudiant_stage_id} created`,
      data: newEtudiantStage,
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
 * /etudiantStages/{etudiantStageId}:
 *   delete:
 *     summary: Delete a etudiant stage by ID
 *     tags: [EtudiantStages]
 *     parameters:
 *       - in: path
 *         name: etudiantStageId
 *         schema:
 *           type: string
 *         required: true
 *         description: The etudiant stage ID
 *     responses:
 *       200:
 *         description: Etudiant stage deleted successfully
 *       404:
 *         description: Etudiant stage not found
 *       400:
 *         description: Bad request
 */
const deleteEtudiantStage = async (req, res) => {
  const { etudiantStageId } = req.params;
  try {
    const etudiantStage = await EtudiantStage.findOne({
      where: { etudiant_stage_id: etudiantStageId },
    });
    if (!etudiantStage) {
      return res.status(404).json({
        success: false,
        message: `EtudiantStage with id ${etudiantStageId} not found`,
      });
    }
    await EtudiantStage.destroy({
      where: { etudiant_stage_id: etudiantStageId },
    });
    res.status(200).json({
      success: true,
      message: `EtudiantStage with id ${etudiantStageId} deleted`,
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
 * /etudiantStages/{etudiantStageId}:
 *   put:
 *     summary: Update a etudiant stage by ID
 *     tags: [EtudiantStages]
 *     parameters:
 *       - in: path
 *         name: etudiantStageId
 *         schema:
 *           type: string
 *         required: true
 *         description: The etudiant stage ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               etudiant_id:
 *                 type: string
 *               stage_id:
 *                 type: string
 *               date_debut:
 *                 type: string
 *                 format: date
 *               date_fin:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Etudiant stage updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EtudiantStage'
 *       404:
 *         description: Etudiant stage not found
 *       400:
 *         description: Bad request
 */
const updateEtudiantStage = async (req, res) => {
  const { etudiantStageId } = req.params;
  const { body } = req;
  try {
    delete body.etudiant_stage_id; // Ensure ID is not updated
    const [updatedRows] = await EtudiantStage.update(
      { ...body },
      { where: { etudiant_stage_id: etudiantStageId } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `EtudiantStage with id ${etudiantStageId} not found or no changes made`,
      });
    }

    const updatedEtudiantStage = await EtudiantStage.findByPk(etudiantStageId);
    res.status(200).json({
      success: true,
      message: `EtudiantStage with id ${etudiantStageId} updated`,
      data: updatedEtudiantStage,
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
  getAllEtudiantStages,
  getEtudiantStageById,
  createEtudiantStage,
  deleteEtudiantStage,
  updateEtudiantStage,
};
