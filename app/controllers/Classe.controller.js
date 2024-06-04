const Classe = require("../models/Classe.model");
const Formation = require("../models/Formation.model");

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: Classe management
 */

/**
 * @swagger
 * /classes:
 *   get:
 *     summary: Retrieve a list of classes
 *     tags: [Classes]
 *     responses:
 *       200:
 *         description: A list of classes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Classe'
 *       400:
 *         description: Bad request
 */
const getAllClasses = async (_, res) => {
  try {
    const classes = await Classe.findAll({
      include: Formation,
    });
    res.status(200).json({
      success: true,
      message: "Get all classes",
      data: classes,
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
 * /classes/{classeId}:
 *   get:
 *     summary: Get a class by ID
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: classeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The class ID
 *     responses:
 *       200:
 *         description: Successfully retrieved class
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Classe'
 *       404:
 *         description: Class not found
 *       400:
 *         description: Bad request
 */
const getClassById = async (req, res) => {
  const { classeId } = req.params;
  try {
    const classe = await Classe.findByPk(classeId);
    if (!classe)
      return res.status(404).json({
        success: false,
        message: `Class with id ${classeId} not found`,
      });

    res.status(200).json({
      success: true,
      message: `Get class with id ${classeId}`,
      data: classe,
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
 * /classes:
 *   post:
 *     summary: Create a new class
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lib_classe_ara:
 *                 type: string
 *                 example: Example in Arabic
 *               lib_classe_fr:
 *                 type: string
 *                 example: Example in French
 *     responses:
 *       201:
 *         description: Class created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Classe'
 *       400:
 *         description: Bad request
 */
const createClass = async (req, res) => {
  const { body } = req;
  try {
    const newClass = await Classe.create({ ...body });
    res.status(201).json({
      success: true,
      message: `New class with id ${newClass.classe_id} created`,
      data: newClass,
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
 * /classes/{classeId}:
 *   delete:
 *     summary: Delete a class by ID
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The class ID
 *     responses:
 *       200:
 *         description: Class deleted successfully
 *       404:
 *         description: Class not found
 *       400:
 *         description: Bad request
 */
const deleteClass = async (req, res) => {
  const { classeId } = req.params;
  try {
    const classe = await Classe.findOne({ where: { classe_id: classeId } });
    if (!classe)
      return res.status(404).json({
        success: false,
        message: `Class with id ${classeId} not found`,
      });

    await Classe.destroy({ where: { classe_id: classeId } });
    res.status(200).json({
      success: true,
      message: `Class with id ${classeId} deleted`,
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
 * /classes/{classeId}:
 *   put:
 *     summary: Update a class by ID
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The class ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lib_classe_ara:
 *                 type: string
 *               lib_classe_fr:
 *                 type: string
 *     responses:
 *       200:
 *         description: Class updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Classe'
 *       404:
 *         description: Class not found
 *       400:
 *         description: Bad request
 */
const updateClass = async (req, res) => {
  const { classeId } = req.params;
  const { body } = req;
  try {
    delete body.classe_id;
    const [updatedRows] = await Classe.update(
      { ...body },
      { where: { classe_id: classeId } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Class with id ${classeId} not found or no changes made`,
      });
    }

    const updatedClass = await Classe.findByPk(classeId);
    res.status(200).json({
      success: true,
      message: `Class with id ${classeId} updated`,
      data: updatedClass,
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
  getAllClasses,
  getClassById,
  createClass,
  deleteClass,
  updateClass,
};
