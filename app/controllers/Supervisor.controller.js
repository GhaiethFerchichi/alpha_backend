const Supervisor = require("../models/Supervisor.model");

const getAllSupervisors = async (_, res) => {
  try {
    const supervisors = await Supervisor.findAll();

    res.status(200).json({
      success: true,
      message: "Get all supervisors",
      data: supervisors,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Contact your administrator",
      error,
    });
  }
};

const getSupervisorById = async (req, res) => {
  const { supervisorId } = req.params;
  try {
    const supervisor = await Supervisor.findByPk(supervisorId);

    if (!supervisor) {
      return res.status(404).json({
        success: false,
        message: `Supervisor with id ${supervisorId} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Get supervisor with id ${supervisorId}`,
      data: supervisor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Contact your administrator",
      error,
    });
  }
};

const createSupervisor = async (req, res) => {
  const { body } = req;
  try {
    const newSupervisor = await Supervisor.create({ ...body });

    res.status(201).json({
      success: true,
      message: `New supervisor with id ${newSupervisor.supervisor_id} created`,
      data: newSupervisor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Contact your administrator",
      error,
    });
  }
};

const deleteSupervisor = async (req, res) => {
  const { supervisorId } = req.params;
  try {
    const supervisor = await Supervisor.findOne({
      where: { supervisor_id: supervisorId },
    });

    if (!supervisor) {
      return res.status(404).json({
        success: false,
        message: `Supervisor with id ${supervisorId} not found`,
      });
    }

    await Supervisor.destroy({ where: { supervisor_id: supervisorId } });

    res.status(200).json({
      success: true,
      message: `Supervisor with id ${supervisorId} deleted`,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Contact your administrator",
      error,
    });
  }
};

const updateSupervisor = async (req, res) => {
  const { supervisorId } = req.params;
  const { body } = req;
  try {
    delete body.supervisor_id;
    const [updatedRows] = await Supervisor.update(
      { ...body },
      { where: { supervisor_id: supervisorId } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Supervisor with id ${supervisorId} not found or no changes made`,
      });
    }

    const updatedSupervisor = await Supervisor.findByPk(supervisorId);
    res.status(200).json({
      success: true,
      message: `Supervisor with id ${supervisorId} updated`,
      data: updatedSupervisor,
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
  getAllSupervisors,
  getSupervisorById,
  createSupervisor,
  deleteSupervisor,
  updateSupervisor,
};
