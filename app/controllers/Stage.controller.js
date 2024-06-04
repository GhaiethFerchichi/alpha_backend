const Stage = require("../models/Stage.model");
const Student = require("../models/Etudiant.model");
const Project = require("../models/Project.model");
const Supervisor = require("../models/Supervisor.model");

const getAllStages = async (_, res) => {
  try {
    const stages = await Stage.findAll({
      include: [
        {
          model: Student,
          attributes: ["student_id", "name", "email", "department"],
        },
        { model: Project, attributes: ["project_id", "title", "description"] },
        {
          model: Supervisor,
          attributes: ["supervisor_id", "name", "department", "contact_info"],
        },
      ],
    });

    res.status(200).json({
      success: true,
      message: "Get all stages",
      data: stages,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Contact your administrator",
      error,
    });
  }
};

const getStageById = async (req, res) => {
  const { stageId } = req.params;
  try {
    const stage = await Stage.findByPk(stageId, {
      include: [
        {
          model: Student,
          attributes: ["student_id", "name", "email", "department"],
        },
        { model: Project, attributes: ["project_id", "title", "description"] },
        {
          model: Supervisor,
          attributes: ["supervisor_id", "name", "department", "contact_info"],
        },
      ],
    });

    if (!stage) {
      return res.status(404).json({
        success: false,
        message: `Stage with id ${stageId} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Get stage with id ${stageId}`,
      data: stage,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Contact your administrator",
      error,
    });
  }
};

const createStage = async (req, res) => {
  const { body } = req;
  try {
    const newStage = await Stage.create({ ...body });

    res.status(201).json({
      success: true,
      message: `New stage with id ${newStage.stage_id} created`,
      data: newStage,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Contact your administrator",
      error,
    });
  }
};

const deleteStage = async (req, res) => {
  const { stageId } = req.params;
  try {
    const stage = await Stage.findOne({ where: { stage_id: stageId } });

    if (!stage) {
      return res.status(404).json({
        success: false,
        message: `Stage with id ${stageId} not found`,
      });
    }

    await Stage.destroy({ where: { stage_id: stageId } });

    res.status(200).json({
      success: true,
      message: `Stage with id ${stageId} deleted`,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Contact your administrator",
      error,
    });
  }
};

const updateStage = async (req, res) => {
  const { stageId } = req.params;
  const { body } = req;
  try {
    delete body.stage_id; // Ensure the stage_id is not being updated
    const [updatedRows] = await Stage.update(
      { ...body },
      { where: { stage_id: stageId } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Stage with id ${stageId} not found or no changes made`,
      });
    }

    const updatedStage = await Stage.findByPk(stageId, {
      include: [
        {
          model: Student,
          attributes: ["student_id", "name", "email", "department"],
        },
        { model: Project, attributes: ["project_id", "title", "description"] },
        {
          model: Supervisor,
          attributes: ["supervisor_id", "name", "department", "contact_info"],
        },
      ],
    });

    res.status(200).json({
      success: true,
      message: `Stage with id ${stageId} updated`,
      data: updatedStage,
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
  getAllStages,
  getStageById,
  createStage,
  deleteStage,
  updateStage,
};
