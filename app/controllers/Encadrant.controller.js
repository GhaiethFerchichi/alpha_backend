const Encadrant = require("../models/Encadrant.model");

const getAllEncadrants = async (_, res) => {
  try {
    const encadrants = await Encadrant.findAll();

    res.status(200).json({
      success: true,
      message: "Get all encadrants",
      data: encadrants,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Contact your administrator",
      error,
    });
  }
};

const getEncadrantById = async (req, res) => {
  const { encadrantId } = req.params;
  try {
    const encadrant = await Encadrant.findByPk(encadrantId);

    if (!encadrant) {
      return res.status(404).json({
        success: false,
        message: `Encadrant with id ${encadrantId} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Get encadrant with id ${encadrantId}`,
      data: encadrant,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Contact your administrator",
      error,
    });
  }
};

const createEncadrant = async (req, res) => {
  const { body } = req;
  try {
    const newEncadrant = await Encadrant.create({ ...body });

    res.status(201).json({
      success: true,
      message: `New encadrant with id ${newEncadrant.encadrant_id} created`,
      data: newEncadrant,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Contact your administrator",
      error,
    });
  }
};

const deleteEncadrant = async (req, res) => {
  const { encadrantId } = req.params;
  try {
    const encadrant = await Encadrant.findOne({
      where: { encadrant_id: encadrantId },
    });

    if (!encadrant) {
      return res.status(404).json({
        success: false,
        message: `Encadrant with id ${encadrantId} not found`,
      });
    }

    await Encadrant.destroy({ where: { encadrant_id: encadrantId } });

    res.status(200).json({
      success: true,
      message: `Encadrant with id ${encadrantId} deleted`,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Contact your administrator",
      error,
    });
  }
};

const updateEncadrant = async (req, res) => {
  const { encadrantId } = req.params;
  const { body } = req;
  try {
    delete body.encadrant_id;
    const [updatedRows] = await Encadrant.update(
      { ...body },
      { where: { encadrant_id: encadrantId } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({
        success: false,
        message: `Encadrant with id ${encadrantId} not found or no changes made`,
      });
    }

    const updatedEncadrant = await Encadrant.findByPk(encadrantId);
    res.status(200).json({
      success: true,
      message: `Encadrant with id ${encadrantId} updated`,
      data: updatedEncadrant,
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
  getAllEncadrants,
  getEncadrantById,
  createEncadrant,
  deleteEncadrant,
  updateEncadrant,
};
