const Classe = require("../models/Classe.model");
const Etudiant = require("../models/Etudiant.model");
const NiveauFormation = require("../models/NiveauFormation.model");
const ExcelJS = require("exceljs");
const path = require("path");
const fs = require("fs");
const Formation = require("../models/Formation.model");
const Type_Stage = require("../models/TypeStage.model");

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
      include: [NiveauFormation],
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

    const newClassPopulate = await Classe.findByPk(newClass.classe_id, {
      include: NiveauFormation,
    });
    res.status(201).json({
      success: true,
      message: `New class with id ${newClass.classe_id} created`,
      data: newClassPopulate,
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

const saveFromExcelClasse = async (req, res) => {
  const { file } = req;
  const { classeId } = req.params;
  console.log(req.params);
  const filePath = path.resolve(__dirname, "../uploads/excel", file.filename);

  try {
    // Create a new workbook and read the Excel file
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    // Get the first worksheet
    const worksheet = workbook.getWorksheet(1);

    // Iterate through all rows in the worksheet
    const rows = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        const cin = row.getCell(1).value;
        const name = row.getCell(2).value;
        const email = row.getCell(3).value;
        const dte_naiss = row.getCell(4).value;
        const phone_nbr = row.getCell(5).value;

        rows.push({
          cin,
          name,
          email,
          dte_naiss,
          phone_nbr,
          classe_id: classeId,
        });
      }
    });

    // Save the rows to the database
    for (const row of rows) {
      await Etudiant.create(row);
    }

    res.status(200).json({
      success: true,
      message: "File processed successfully",
      rowsProcessed: rows.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error processing file",
      error: error.message,
    });
  } finally {
    // Optionally, delete the file after processing
    fs.unlink(filePath, (err) => {
      if (err) console.error("Error deleting file:", err);
    });
  }
};

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
  deleteClass,
  updateClass,
  saveFromExcelClasse,
};
