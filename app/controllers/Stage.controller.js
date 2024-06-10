const Classe = require("../models/Classe.model");
const Etudiant = require("../models/Etudiant.model");
const Niveau_formation = require("../models/NiveauFormation.model");
const Stage = require("../models/Stage.model");

/**
 * @swagger
 * tags:
 *   name: Stages
 *   description: Stage management
 */

/**
 * @swagger
 * /stages:
 *   get:
 *     summary: Retrieve a list of stages
 *     tags: [Stages]
 *     responses:
 *       200:
 *         description: A list of stages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Stage'
 *       400:
 *         description: Bad request
 */
const getAllStages = async (req, res) => {
  try {
    const stages = await Stage.findAll({
      include: [Etudiant, Niveau_formation, Classe],
    });
    res.status(200).json({
      success: true,
      message: "Get all stages",
      data: stages,
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
 * /stages/{stageId}:
 *   get:
 *     summary: Get a stage by ID
 *     tags: [Stages]
 *     parameters:
 *       - in: path
 *         name: stageId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The stage ID
 *     responses:
 *       200:
 *         description: Successfully retrieved stage
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stage'
 *       404:
 *         description: Stage not found
 *       400:
 *         description: Bad request
 */
const getStageById = async (req, res) => {
  const { stageId } = req.params;
  try {
    const stage = await Stage.findByPk(stageId, {
      include: [Etudiant, Niveau_formation, Classe],
    });
    if (!stage)
      return res.status(404).json({
        success: false,
        message: `Stage with id ${stageId} not found`,
      });

    res.status(200).json({
      success: true,
      message: `Get stage with id ${stageId}`,
      data: stage,
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
 * /stages:
 *   post:
 *     summary: Create a new stage
 *     tags: [Stages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 example: "Completed"
 *               evaluation:
 *                 type: string
 *     responses:
 *       201:
 *         description: Stage created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stage'
 *       400:
 *         description: Bad request
 */
const createStage = async (req, res) => {
  const { body } = req;
  try {
    const newStage = await Stage.create({ ...body });
    res.status(201).json({
      success: true,
      message: `New stage with id ${newStage.stage_id} created`,
      data: newStage,
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
 * /stages/{stageId}:
 *   delete:
 *     summary: Delete a stage by ID
 *     tags: [Stages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: stageId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The stage ID
 *     responses:
 *       200:
 *         description: Stage deleted successfully
 *       404:
 *         description: Stage not found
 *       400:
 *         description: Bad request
 */
const deleteStage = async (req, res) => {
  const { stageId } = req.params;
  try {
    const stage = await Stage.findOne({
      where: { stage_id: stageId },
      include: [Etudiant, Niveau_formation, Classe],
    });
    if (!stage)
      return res.status(404).json({
        success: false,
        message: `Stage with id ${stageId} not found`,
      });

    await Stage.destroy({ where: { stage_id: stageId } });
    res.status(200).json({
      success: true,
      message: `Stage with id ${stageId} deleted`,
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
 * /stages/{stageId}:
 *   put:
 *     summary: Update a stage by ID
 *     tags: [Stages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: stageId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The stage ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *               evaluation:
 *                 type: string
 *     responses:
 *       200:
 *         description: Stage updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stage'
 *       404:
 *         description: Stage not found
 *       400:
 *         description: Bad request
 */
const updateStage = async (req, res) => {
  const { stageId } = req.params;
  const { body } = req;
  try {
    delete body.stage_id;
    const [updatedRows] = await Stage.update(
      { ...body },
      { where: { stage_id: stageId } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Stage with id ${stageId} not found or no changes made`,
      });
    }

    const updatedStage = await Stage.findByPk(stageId, {
      include: [Etudiant, Niveau_formation, Classe],
    });
    res.status(200).json({
      success: true,
      message: `Stage with id ${stageId} updated`,
      data: updatedStage,
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
  getAllStages,
  getStageById,
  createStage,
  deleteStage,
  updateStage,
};
