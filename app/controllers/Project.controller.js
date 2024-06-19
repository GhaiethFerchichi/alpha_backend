const Organisme = require("../models/Organisme.model");
const Project = require("../models/Project.model");

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Successfully retrieved all projects
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
 *                   example: Get all projects
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
 *       400:
 *         description: Failed to retrieve projects
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
const getAllProjects = async (_, res) => {
  try {
    const projects = await Project.findAll({ include: Organisme });
    res.status(200).json({
      success: true,
      message: "Get all projects",
      data: projects,
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
 * /projects/{projectId}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the project to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the project
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
 *                   example: Get project with id 1
 *                 data:
 *                   $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Failed to retrieve the project
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
const getProjectById = async (req, res) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findByPk(projectId, { include: Organisme });

    if (!project)
      return res.status(404).json({
        success: false,
        message: `Project with id ${projectId} not found`,
      });

    res.status(200).json({
      success: true,
      message: `Get project with id ${projectId}`,
      data: project,
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
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectInput'
 *     responses:
 *       201:
 *         description: Successfully created a new project
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
 *                   example: New project with id 1
 *                 data:
 *                   $ref: '#/components/schemas/Project'
 *       400:
 *         description: Failed to create a project
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
const createProject = async (req, res) => {
  const { body } = req;
  try {
    const newProject = await Project.create({ ...body });

    res.status(201).json({
      success: true,
      message: `New project with id ${newProject.project_id}`,
      data: newProject,
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
 * /projects/{projectId}:
 *   delete:
 *     summary: Delete a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the project to delete
 *     responses:
 *       200:
 *         description: Successfully deleted the project
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
 *                   example: Project with id 1 deleted
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Failed to delete the project
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
const deleteProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findOne({ where: { project_id: projectId } });

    if (!project)
      return res.status(404).json({
        success: false,
        message: `Project with id ${projectId} not found`,
      });

    await Project.destroy({ where: { project_id: projectId } });

    res.status(200).json({
      success: true,
      message: `Project with id ${projectId} deleted`,
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
 * /projects/{projectId}:
 *   put:
 *     summary: Update a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the project to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectInput'
 *     responses:
 *       200:
 *         description: Successfully updated the project
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
 *                   example: Project with id 1 updated
 *                 data:
 *                   $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found or no changes made
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Failed to update the project
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
const updateProject = async (req, res) => {
  const { projectId } = req.params;
  const { body } = req;
  try {
    delete body.projectId;
    const [updatedRows] = await Project.update(
      { ...body },
      { where: { project_id: projectId } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Project with id ${projectId} not found or no changes made`,
      });
    }

    const updatedProject = await Project.findByPk(projectId, {
      include: Organisme,
    });
    res.status(200).json({
      success: true,
      message: `Project with id ${projectId} updated`,
      data: updatedProject,
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
  getAllProjects,
  getProjectById,
  createProject,
  deleteProject,
  updateProject,
};
