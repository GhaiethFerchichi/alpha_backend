const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");
const Student = require("./Etudiant.model");
const Project = require("./Project.model");
const Supervisor = require("./Supervisor.model");

const Stage = sequelize.define(
  "Stage",
  {
    stage_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    evaluation: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "Stages",
    timestamps: true,
  }
);

module.exports = Stage;
