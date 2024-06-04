const { where } = require("sequelize");
const User = require("../models/Users.model");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         user_id:
 *           type: integer
 *         // Add other properties based on your User model
 *     Error:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Error message
 *         error:
 *           type: object
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successfully retrieved all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Get all users
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       400:
 *         description: Failed to retrieve users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
const findAllUsers = async (_, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json({
      success: true,
      message: "Get all users",
      data: users,
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
 * /users/username/{username}:
 *   get:
 *     summary: Get a user by username
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username of the user to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Failed to retrieve the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
const findUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ where: { username } });

    console.log(req.headers);
    // console.log(user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: `Get user by username ${username}`,
      data: user,
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
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *               - firstname
 *               - lastname
 *     responses:
 *       201:
 *         description: Successfully created a new user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User created with id 1
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     password:
 *                       type: string
 *                     firstname:
 *                       type: string
 *                     lastname:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Failed to create a user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

const createUser = async (req, res) => {
  const { body } = req;
  try {
    const createdUser = await User.create({ ...body });

    res.status(201).json({
      success: true,
      message: `User created with id ${createdUser.user_id}`,
      data: createdUser,
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
  findAllUsers,
  findUserByUsername,
  createUser,
};
