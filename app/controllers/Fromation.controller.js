const Departement = require("../models/Departement.model");
const Formation = require("../models/Formation.model");

/**
 * @swagger
 * tags:
 *   name: Formations
 *   description: Formation management
 */

/**
 * @swagger
 * /formations:
 *   get:
 *     summary: Retrieve a list of formations
 *     tags: [Formations]
 *     responses:
 *       200:
 *         description: A list of formations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Formation'
 *       400:
 *         description: Bad request
 */
const getAllFormations = async (_, res) => {
  try {
    const formations = await Formation.findAll({ include: Departement });
    res.status(200).json({
      success: true,
      message: "Get all formations",
      data: formations,
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
 * /formations/{formationId}:
 *   get:
 *     summary: Get a formation by ID
 *     tags: [Formations]
 *     parameters:
 *       - in: path
 *         name: formationId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The formation ID
 *     responses:
 *       200:
 *         description: Successfully retrieved formation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Formation'
 *       404:
 *         description: Formation not found
 *       400:
 *         description: Bad request
 */
const getFormationById = async (req, res) => {
  const { formationId } = req.params;
  try {
    const formation = await Formation.findByPk(formationId, {
      include: Departement,
    });
    if (!formation)
      return res.status(404).json({
        success: false,
        message: `Formation with id ${formationId} not found`,
      });

    res.status(200).json({
      success: true,
      message: `Get formation with id ${formationId}`,
      data: formation,
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
 * /formations:
 *   post:
 *     summary: Create a new formation
 *     tags: [Formations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lib_formation_ara:
 *                 type: string
 *                 example: Example in Arabic
 *               lib_formation_fr:
 *                 type: string
 *                 example: Example in French
 *     responses:
 *       201:
 *         description: Formation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Formation'
 *       400:
 *         description: Bad request
 */
const createFormation = async (req, res) => {
  const { body } = req;
  try {
    const newFormation = await Formation.create({ ...body });
    res.status(201).json({
      success: true,
      message: `New formation with id ${newFormation.formation_id} created`,
      data: newFormation,
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
 * /formations/{formationId}:
 *   delete:
 *     summary: Delete a formation by ID
 *     tags: [Formations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: formationId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The formation ID
 *     responses:
 *       200:
 *         description: Formation deleted successfully
 *       404:
 *         description: Formation not found
 *       400:
 *         description: Bad request
 */
const deleteFormation = async (req, res) => {
  const { formationId } = req.params;
  try {
    const formation = await Formation.findOne({
      where: { formation_id: formationId },
    });
    if (!formation)
      return res.status(404).json({
        success: false,
        message: `Formation with id ${formationId} not found`,
      });

    await Formation.destroy({ where: { formation_id: formationId } });
    res.status(200).json({
      success: true,
      message: `Formation with id ${formationId} deleted`,
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
 * /formations/{formationId}:
 *   put:
 *     summary: Update a formation by ID
 *     tags: [Formations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: formationId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The formation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lib_formation_ara:
 *                 type: string
 *               lib_formation_fr:
 *                 type: string
 *     responses:
 *       200:
 *         description: Formation updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Formation'
 *       404:
 *         description: Formation not found
 *       400:
 *         description: Bad request
 */
const updateFormation = async (req, res) => {
  const { formationId } = req.params;
  const { body } = req;
  try {
    delete body.formation_id;
    const [updatedRows] = await Formation.update(
      { ...body },
      { where: { formation_id: formationId } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Formation with id ${formationId} not found or no changes made`,
      });
    }

    const updatedFormation = await Formation.findByPk(formationId, {
      include: Departement,
    });
    res.status(200).json({
      success: true,
      message: `Formation with id ${formationId} updated`,
      data: updatedFormation,
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
  getAllFormations,
  getFormationById,
  createFormation,
  deleteFormation,
  updateFormation,
};
