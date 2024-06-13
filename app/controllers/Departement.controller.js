const Departement = require("../models/Departement.model");

/**
 * @swagger
 * tags:
 *   name: Departements
 *   description: Departement management
 */

/**
 * @swagger
 * /departements:
 *   get:
 *     summary: Retrieve a list of departements
 *     tags: [Departements]
 *     responses:
 *       200:
 *         description: A list of departements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Departement'
 *       400:
 *         description: Bad request
 */
const getAllDepartements = async (_, res) => {
  try {
    const departements = await Departement.findAll();
    res.status(200).json({
      success: true,
      message: "Get all departements",
      data: departements,
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
 * /departements/{departementId}:
 *   get:
 *     summary: Get a departement by ID
 *     tags: [Departements]
 *     parameters:
 *       - in: path
 *         name: departementId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The departement ID
 *     responses:
 *       200:
 *         description: Successfully retrieved departement
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Departement'
 *       404:
 *         description: Departement not found
 *       400:
 *         description: Bad request
 */
const getDepartementById = async (req, res) => {
  const { departementId } = req.params;
  try {
    const departement = await Departement.findByPk(departementId);
    if (!departement)
      return res.status(404).json({
        success: false,
        message: `Departement with id ${departementId} not found`,
      });

    res.status(200).json({
      success: true,
      message: `Get departement with id ${departementId}`,
      data: departement,
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
 * /departements:
 *   post:
 *     summary: Create a new departement
 *     tags: [Departements]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code_departement:
 *                 type: string
 *                 example: DEPT001
 *               lib_departement_ara:
 *                 type: string
 *                 example: اسم القسم بالعربية
 *               lib_departement_fr:
 *                 type: string
 *                 example: Nom du département en français
 *     responses:
 *       201:
 *         description: Departement created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Departement'
 *       400:
 *         description: Bad request
 */
const createDepartement = async (req, res) => {
  const { body } = req;
  try {
    const newDepartement = await Departement.create({ ...body });

    res.status(201).json({
      success: true,
      message: `New departement with id ${newDepartement.departement_id} created`,
      data: newDepartement,
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
 * /departements/{departementId}:
 *   delete:
 *     summary: Delete a departement by ID
 *     tags: [Departements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: departementId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The departement ID
 *     responses:
 *       200:
 *         description: Departement deleted successfully
 *       404:
 *         description: Departement not found
 *       400:
 *         description: Bad request
 */
const deleteDepartement = async (req, res) => {
  const { departementId } = req.params;
  try {
    const departement = await Departement.findOne({
      where: { departement_id: departementId },
    });
    if (!departement)
      return res.status(404).json({
        success: false,
        message: `Departement with id ${departementId} not found`,
      });

    await Departement.destroy({ where: { departement_id: departementId } });
    res.status(200).json({
      success: true,
      message: `Departement with id ${departementId} deleted`,
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
 * /departements/{departementId}:
 *   put:
 *     summary: Update a departement by ID
 *     tags: [Departements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: departementId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The departement ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code_departement:
 *                 type: string
 *               lib_departement_ara:
 *                 type: string
 *               lib_departement_fr:
 *                 type: string
 *     responses:
 *       200:
 *         description: Departement updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Departement'
 *       404:
 *         description: Departement not found
 *       400:
 *         description: Bad request
 */
const updateDepartement = async (req, res) => {
  const { departementId } = req.params;
  const { body } = req;
  try {
    delete body.departement_id;
    const [updatedRows] = await Departement.update(
      { ...body },
      { where: { departement_id: departementId } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Departement with id ${departementId} not found or no changes made`,
      });
    }

    const updatedDepartement = await Departement.findByPk(departementId);
    res.status(200).json({
      success: true,
      message: `Departement with id ${departementId} updated`,
      data: updatedDepartement,
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
  getAllDepartements,
  getDepartementById,
  createDepartement,
  deleteDepartement,
  updateDepartement,
};
