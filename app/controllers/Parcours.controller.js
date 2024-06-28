const Parcours = require("../models/Parcours.model");

/**
 * @swagger
 * tags:
 *   name: Parcours
 *   description: Parcour management
 */

/**
 * @swagger
 * /parcours:
 *   get:
 *     summary: Retrieve a list of parcours
 *     tags: [Parcours]
 *     responses:
 *       200:
 *         description: A list of parcours
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Parcour'
 *       400:
 *         description: Bad request
 */
const getAllParcours = async (_, res) => {
  try {
    const parcours = await Parcours.findAll();
    res.status(200).json({
      success: true,
      message: "Get all parcours",
      data: parcours,
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
 * /parcours/{parcoursId}:
 *   get:
 *     summary: Get a parcour by ID
 *     tags: [Parcours]
 *     parameters:
 *       - in: path
 *         name: parcoursId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The parcour ID
 *     responses:
 *       200:
 *         description: Successfully retrieved parcour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parcour'
 *       404:
 *         description: Parcour not found
 *       400:
 *         description: Bad request
 */
const getParcourById = async (req, res) => {
  const { parcoursId } = req.params;
  try {
    const parcours = await Parcours.findByPk(parcoursId);
    if (!parcours)
      return res.status(404).json({
        success: false,
        message: `Parcour with id ${parcoursId} not found`,
      });

    res.status(200).json({
      success: true,
      message: `Get parcour with id ${parcoursId}`,
      data: parcours,
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
 * /parcours:
 *   post:
 *     summary: Create a new parcour
 *     tags: [Parcours]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code_parcours:
 *                 type: string
 *                 example: EX123
 *               lib_parcours_ara:
 *                 type: string
 *                 example: مثال باللغة العربية
 *               lib_parcours_fr:
 *                 type: string
 *                 example: Exemple en français
 *     responses:
 *       201:
 *         description: Parcour created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parcour'
 *       400:
 *         description: Bad request
 */
const createParcour = async (req, res) => {
  const { body } = req;
  try {
    const newParcours = await Parcours.create({ ...body });

    const newParcoursPopulate = await Parcours.findByPk(
      newParcours.parcours_id
    );

    res.status(201).json({
      success: true,
      message: `New parcour with id ${newParcours.parcours_id} created`,
      data: newParcoursPopulate,
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
 * /parcours/{parcoursId}:
 *   delete:
 *     summary: Delete a parcour by ID
 *     tags: [Parcours]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: parcoursId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The parcour ID
 *     responses:
 *       200:
 *         description: Parcour deleted successfully
 *       404:
 *         description: Parcour not found
 *       400:
 *         description: Bad request
 */
const deleteParcour = async (req, res) => {
  const { parcoursId } = req.params;
  try {
    const Parcours = await Parcours.findOne({
      where: { parcours_id: parcoursId },
    });
    if (!parcour)
      return res.status(404).json({
        success: false,
        message: `Parcour with id ${parcoursId} not found`,
      });

    await Parcour.destroy({ where: { parcours_id: parcoursId } });
    res.status(200).json({
      success: true,
      message: `Parcour with id ${parcoursId} deleted`,
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
 * /parcours/{parcoursId}:
 *   put:
 *     summary: Update a parcour by ID
 *     tags: [Parcours]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: parcoursId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The parcour ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code_parcours:
 *                 type: string
 *               lib_parcours_ara:
 *                 type: string
 *               lib_parcours_fr:
 *                 type: string
 *     responses:
 *       200:
 *         description: Parcour updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parcour'
 *       404:
 *         description: Parcour not found
 *       400:
 *         description: Bad request
 */
const updateParcour = async (req, res) => {
  const { parcoursId } = req.params;
  const { body } = req;
  try {
    delete body.parcours_id;
    const [updatedRows] = await Parcours.update(
      { ...body },
      { where: { parcours_id: parcoursId } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Parcour with id ${parcoursId} not found or no changes made`,
      });
    }

    const updatedParcours = await Parcours.findByPk(parcoursId);
    res.status(200).json({
      success: true,
      message: `Parcour with id ${parcoursId} updated`,
      data: updatedParcours,
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
  getAllParcours,
  getParcourById,
  createParcour,
  deleteParcour,
  updateParcour,
};
