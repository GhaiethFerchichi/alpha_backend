const Organisme = require("../models/Organisme.model");

/**
 * @swagger
 * tags:
 *   name: Organismes
 *   description: Organisme management
 */

/**
 * @swagger
 * /organismes:
 *   get:
 *     summary: Retrieve a list of organismes
 *     tags: [Organismes]
 *     responses:
 *       200:
 *         description: A list of organismes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Organisme'
 *       400:
 *         description: Bad request
 */
const getAllOrganismes = async (_, res) => {
  try {
    const organismes = await Organisme.findAll();
    res.status(200).json({
      success: true,
      message: "Get all organismes",
      data: organismes,
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
 * /organismes/{organismeId}:
 *   get:
 *     summary: Get an organisme by ID
 *     tags: [Organismes]
 *     parameters:
 *       - in: path
 *         name: organismeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The organisme ID
 *     responses:
 *       200:
 *         description: Successfully retrieved organisme
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organisme'
 *       404:
 *         description: Organisme not found
 *       400:
 *         description: Bad request
 */
const getOrganismeById = async (req, res) => {
  const { organismeId } = req.params;
  try {
    const organisme = await Organisme.findByPk(organismeId);
    if (!organisme)
      return res.status(404).json({
        success: false,
        message: `Organisme with id ${organismeId} not found`,
      });

    res.status(200).json({
      success: true,
      message: `Get organisme with id ${organismeId}`,
      data: organisme,
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
 * /organismes:
 *   post:
 *     summary: Create a new organisme
 *     tags: [Organismes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lib_organisme:
 *                 type: string
 *                 example: New Organisme
 *               tel:
 *                 type: string
 *                 example: "0123456789"
 *               fax:
 *                 type: string
 *                 example: "0123456789"
 *               adresse:
 *                 type: string
 *                 example: "123 Street, City"
 *     responses:
 *       201:
 *         description: Organisme created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organisme'
 *       400:
 *         description: Bad request
 */
const createOrganisme = async (req, res) => {
  const { body } = req;
  try {
    const newOrganisme = await Organisme.create({ ...body });
    res.status(201).json({
      success: true,
      message: `New organisme with id ${newOrganisme.organisme_id} created`,
      data: newOrganisme,
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
 * /organismes/{organismeId}:
 *   delete:
 *     summary: Delete an organisme by ID
 *     tags: [Organismes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: organismeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The organisme ID
 *     responses:
 *       200:
 *         description: Organisme deleted successfully
 *       404:
 *         description: Organisme not found
 *       400:
 *         description: Bad request
 */
const deleteOrganisme = async (req, res) => {
  const { organismeId } = req.params;
  try {
    const organisme = await Organisme.findOne({
      where: { organisme_id: organismeId },
    });
    if (!organisme)
      return res.status(404).json({
        success: false,
        message: `Organisme with id ${organismeId} not found`,
      });

    await Organisme.destroy({ where: { organisme_id: organismeId } });
    res.status(200).json({
      success: true,
      message: `Organisme with id ${organismeId} deleted`,
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
 * /organismes/{organismeId}:
 *   put:
 *     summary: Update an organisme by ID
 *     tags: [Organismes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: organismeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The organisme ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lib_organisme:
 *                 type: string
 *               tel:
 *                 type: string
 *               fax:
 *                 type: string
 *               adresse:
 *                 type: string
 *     responses:
 *       200:
 *         description: Organisme updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organisme'
 *       404:
 *         description: Organisme not found
 *       400:
 *         description: Bad request
 */
const updateOrganisme = async (req, res) => {
  const { organismeId } = req.params;
  const { body } = req;
  try {
    delete body.organisme_id;
    const [updatedRows] = await Organisme.update(
      { ...body },
      { where: { organisme_id: organismeId } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Organisme with id ${organismeId} not found or no changes made`,
      });
    }

    const updatedOrganisme = await Organisme.findByPk(organismeId);
    res.status(200).json({
      success: true,
      message: `Organisme with id ${organismeId} updated`,
      data: updatedOrganisme,
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
  getAllOrganismes,
  getOrganismeById,
  createOrganisme,
  deleteOrganisme,
  updateOrganisme,
};
