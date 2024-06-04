const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");

const Project = sequelize.define(
  "Project",
  {
    project_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    tableName: "Projects",
    timestamps: true,
  }
);

module.exports = Project;
