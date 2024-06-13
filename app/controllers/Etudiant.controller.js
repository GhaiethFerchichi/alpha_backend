const Classe = require("../models/Classe.model");
const Etudiant = require("../models/Etudiant.model");

/**
 * @swagger
 * tags:
 *   name: Etudiants
 *   description: Etudiant management
 */

/**
 * @swagger
 * /etudiants:
 *   get:
 *     summary: Retrieve a list of etudiants
 *     tags: [Etudiants]
 *     responses:
 *       200:
 *         description: A list of etudiants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Etudiant'
 *       400:
 *         description: Bad request
 */
const getAllEtudiants = async (_, res) => {
  try {
    const etudiants = await Etudiant.findAll();
    res.status(200).json({
      success: true,
      message: "Get all etudiants",
      data: etudiants,
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
 * /etudiants/{etudiantId}:
 *   get:
 *     summary: Get a etudiant by ID
 *     tags: [Etudiants]
 *     parameters:
 *       - in: path
 *         name: etudiantId
 *         schema:
 *           type: string
 *         required: true
 *         description: The etudiant ID
 *     responses:
 *       200:
 *         description: Successfully retrieved etudiant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Etudiant'
 *       404:
 *         description: Etudiant not found
 *       400:
 *         description: Bad request
 */
const getEtudiantById = async (req, res) => {
  const { etudiantId } = req.params;
  try {
    const etudiant = await Etudiant.findByPk(etudiantId, { include: [Classe] });
    if (!etudiant)
      return res.status(404).json({
        success: false,
        message: `Etudiant with id ${etudiantId} not found`,
      });

    res.status(200).json({
      success: true,
      message: `Get etudiant with id ${etudiantId}`,
      data: etudiant,
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
 * /etudiants:
 *   post:
 *     summary: Create a new etudiant
 *     tags: [Etudiants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *     responses:
 *       201:
 *         description: Etudiant created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Etudiant'
 *       400:
 *         description: Bad request
 */
const createEtudiant = async (req, res) => {
  const { body } = req;
  try {
    const newEtudiant = await Etudiant.create({ ...body });
    res.status(201).json({
      success: true,
      message: `New etudiant with id ${newEtudiant.cin} created`,
      data: newEtudiant,
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
 * /etudiants/{etudiantId}:
 *   delete:
 *     summary: Delete a etudiant by ID
 *     tags: [Etudiants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: etudiantId
 *         schema:
 *           type: string
 *         required: true
 *         description: The etudiant ID
 *     responses:
 *       200:
 *         description: Etudiant deleted successfully
 *       404:
 *         description: Etudiant not found
 *       400:
 *         description: Bad request
 */
const deleteEtudiant = async (req, res) => {
  const { etudiantId } = req.params;
  try {
    const etudiant = await Etudiant.findOne({
      where: { cin: etudiantId },
    });
    if (!etudiant)
      return res.status(404).json({
        success: false,
        message: `Etudiant with id ${etudiantId} not found`,
      });

    await Etudiant.destroy({ where: { cin: etudiantId } });
    res.status(200).json({
      success: true,
      message: `Etudiant with id ${etudiantId} deleted`,
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
 * /etudiants/{etudiantId}:
 *   put:
 *     summary: Update a etudiant by ID
 *     tags: [Etudiants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: etudiantId
 *         schema:
 *           type: string
 *         required: true
 *         description: The etudiant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Etudiant updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Etudiant'
 *       404:
 *         description: Etudiant not found
 *       400:
 *         description: Bad request
 */
const updateEtudiant = async (req, res) => {
  const { etudiantId } = req.params;
  const { body } = req;
  try {
    delete body.cin;
    const [updatedRows] = await Etudiant.update(
      { ...body },
      { where: { cin: etudiantId } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Etudiant with id ${etudiantId} not found or no changes made`,
      });
    }

    const updatedEtudiant = await Etudiant.findByPk(etudiantId);
    res.status(200).json({
      success: true,
      message: `Etudiant with id ${etudiantId} updated`,
      data: updatedEtudiant,
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
 * /etudiants/classe/{classeId}:
 *   get:
 *     summary: Retrieve a list of students in a specific class
 *     tags: [Etudiants]
 *     parameters:
 *       - in: path
 *         name: classeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the class
 *     responses:
 *       200:
 *         description: Successfully retrieved students of the class
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Etudiant'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
const getClasseEtudiants = async (req, res) => {
  const { classeId } = req.params;

  try {
    const etudiantsByClasse = await Etudiant.findAll(
      {
        where: { classe_id: classeId },
      },
      { include: Classe }
    );

    res.status(200).json({
      success: true,
      message: `Get Etudiants of classe with id ${classeId}`,
      data: etudiantsByClasse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Contact your administrator",
      error: error,
    });
  }
};

module.exports = {
  getAllEtudiants,
  getEtudiantById,
  createEtudiant,
  deleteEtudiant,
  updateEtudiant,
  getClasseEtudiants,
};
