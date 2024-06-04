const Type_Stage = require("../models/TypeStage.model");

/**
 * @swagger
 * tags:
 *   name: Type_Stages
 *   description: Type_Stage management
 */

/**
 * @swagger
 * /type_stages:
 *   get:
 *     summary: Retrieve a list of type stages
 *     tags: [Type_Stages]
 *     responses:
 *       200:
 *         description: A list of type stages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Type_Stage'
 *       400:
 *         description: Bad request
 */
const getAllTypeStages = async (_, res) => {
  try {
    const typeStages = await Type_Stage.findAll();
    res.status(200).json({
      success: true,
      message: "Get all type stages",
      data: typeStages,
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
 * /type_stages/{type_stage_id}:
 *   get:
 *     summary: Get a type stage by ID
 *     tags: [Type_Stages]
 *     parameters:
 *       - in: path
 *         name: type_stage_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The type stage ID
 *     responses:
 *       200:
 *         description: Successfully retrieved type stage
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Type_Stage'
 *       404:
 *         description: Type stage not found
 *       400:
 *         description: Bad request
 */
const getTypeStageById = async (req, res) => {
  // const { type_stage_id } = req.params;

  const { type_stage_id } = req.params;
  try {
    const typeStage = await Type_Stage.findByPk(type_stage_id);
    if (!typeStage)
      return res.status(404).json({
        success: false,
        message: `Type stage with id ${type_stage_id} not found`,
      });

    res.status(200).json({
      success: true,
      message: `Get type stage with id ${type_stage_id}`,
      data: typeStage,
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
 * /type_stages:
 *   post:
 *     summary: Create a new type stage
 *     tags: [Type_Stages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lib_Type_Stage_ara:
 *                 type: string
 *                 example: Example in Arabic
 *               lib_Type_Stage_fr:
 *                 type: string
 *                 example: Example in French
 *     responses:
 *       201:
 *         description: Type stage created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Type_Stage'
 *       400:
 *         description: Bad request
 */
const createTypeStage = async (req, res) => {
  const { body } = req;
  try {
    const newTypeStage = await Type_Stage.create({ ...body });
    res.status(201).json({
      success: true,
      message: `New type stage with id ${newTypeStage.Type_Stage_id} created`,
      data: newTypeStage,
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
 * /type_stages/{type_stage_id}:
 *   delete:
 *     summary: Delete a type stage by ID
 *     tags: [Type_Stages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: type_stage_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The type stage ID
 *     responses:
 *       200:
 *         description: Type stage deleted successfully
 *       404:
 *         description: Type stage not found
 *       400:
 *         description: Bad request
 */
const deleteTypeStage = async (req, res) => {
  const { type_stage_id } = req.params;
  try {
    const typeStage = await Type_Stage.findOne({
      where: { Type_Stage_id: type_stage_id },
    });
    if (!typeStage)
      return res.status(404).json({
        success: false,
        message: `Type stage with id ${type_stage_id} not found`,
      });

    await Type_Stage.destroy({ where: { Type_Stage_id: type_stage_id } });
    res.status(200).json({
      success: true,
      message: `Type stage with id ${type_stage_id} deleted`,
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
 * /type_stages/{type_stage_id}:
 *   put:
 *     summary: Update a type stage by ID
 *     tags: [Type_Stages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: type_stage_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The type stage ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lib_Type_Stage_ara:
 *                 type: string
 *               lib_Type_Stage_fr:
 *                 type: string
 *     responses:
 *       200:
 *         description: Type stage updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Type_Stage'
 *       404:
 *         description: Type stage not found
 *       400:
 *         description: Bad request
 */
const updateTypeStage = async (req, res) => {
  const { type_stage_id } = req.params;
  const { body } = req;
  try {
    delete body.Type_Stage_id;
    const [updatedRows] = await Type_Stage.update(
      { ...body },
      { where: { Type_Stage_id: type_stage_id } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Type stage with id ${type_stage_id} not found or no changes made`,
      });
    }

    const updatedTypeStage = await Type_Stage.findByPk(type_stage_id);
    res.status(200).json({
      success: true,
      message: `Type stage with id ${type_stage_id} updated`,
      data: updatedTypeStage,
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
  getAllTypeStages,
  getTypeStageById,
  createTypeStage,
  deleteTypeStage,
  updateTypeStage,
};
