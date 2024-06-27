const UserType = require("../models/UserType.model");

/**
 * @swagger
 * tags:
 *   name: user_type
 *   description: user type management
 */
/**
 * @swagger
 * /usertypes:
 *   get:
 *     summary: Retrieve a list of user types
 *     tags: [user_type]
 *     description: Retrieve a list of all user types.
 *     responses:
 *       200:
 *         description: A list of user types
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserType'
 *       400:
 *         description: Error occurred
 */
const getAllUserTypes = async (_, res) => {
  try {
    const userTypes = await UserType.findAll();

    res.status(200).json({
      success: true,
      message: "Get all user types",
      data: userTypes,
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
 * /usertypes/{userTypeId}:
 *   get:
 *     summary: Retrieve a single user type
 *     tags: [user_type]
 *     description: Retrieve a user type by its ID.
 *     parameters:
 *       - in: path
 *         name: userTypeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user type to retrieve
 *     responses:
 *       200:
 *         description: A single user type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/UserType'
 *       404:
 *         description: User type not found
 *       400:
 *         description: Error occurred
 */
const getUserTypeById = async (req, res) => {
  const { userTypeId } = req.params;
  try {
    const userType = await UserType.findByPk(userTypeId);

    if (!userType) {
      return res.status(404).json({
        success: false,
        message: `User type with id ${userTypeId} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Get user type with id ${userTypeId}`,
      data: userType,
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
 * /usertypes:
 *   post:
 *     summary: Create a new user type
 *     tags: [user_type]
 *     description: Create a new user type.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lib_user_type:
 *                 type: string
 *                 description: The name of the user type
 *                 example: "Admin"
 *     responses:
 *       201:
 *         description: New user type created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/UserType'
 *       400:
 *         description: Error occurred
 */
const createUserType = async (req, res) => {
  const { body } = req;
  try {
    const newUserType = await UserType.create({ ...body });

    res.status(201).json({
      success: true,
      message: `New user type with id ${newUserType.user_type_id} created`,
      data: newUserType,
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
 * /usertypes/{userTypeId}:
 *   delete:
 *     summary: Delete a user type
 *     tags: [user_type]
 *     description: Delete a user type by its ID.
 *     parameters:
 *       - in: path
 *         name: userTypeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user type to delete
 *     responses:
 *       200:
 *         description: User type deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: User type not found
 *       400:
 *         description: Error occurred
 */
const deleteUserType = async (req, res) => {
  const { userTypeId } = req.params;
  try {
    const userType = await UserType.findOne({
      where: { user_type_id: userTypeId },
    });

    if (!userType) {
      return res.status(404).json({
        success: false,
        message: `User type with id ${userTypeId} not found`,
      });
    }

    await UserType.destroy({ where: { user_type_id: userTypeId } });

    res.status(200).json({
      success: true,
      message: `User type with id ${userTypeId} deleted`,
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
 * /usertypes/{userTypeId}:
 *   put:
 *     summary: Update a user type
 *     tags: [user_type]
 *     description: Update a user type by its ID.
 *     parameters:
 *       - in: path
 *         name: userTypeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user type to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lib_user_type:
 *                 type: string
 *                 description: The name of the user type
 *                 example: "Moderator"
 *     responses:
 *       200:
 *         description: User type updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/UserType'
 *       404:
 *         description: User type not found or no changes made
 *       400:
 *         description: Error occurred
 */
const updateUserType = async (req, res) => {
  const { userTypeId } = req.params;
  const { body } = req;
  try {
    delete body.user_type_id;
    const [updatedRows] = await UserType.update(
      { ...body },
      { where: { user_type_id: userTypeId } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `User type with id ${userTypeId} not found or no changes made`,
      });
    }

    const updatedUserType = await UserType.findByPk(userTypeId);
    res.status(200).json({
      success: true,
      message: `User type with id ${userTypeId} updated`,
      data: updatedUserType,
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
  getAllUserTypes,
  getUserTypeById,
  createUserType,
  deleteUserType,
  updateUserType,
};
