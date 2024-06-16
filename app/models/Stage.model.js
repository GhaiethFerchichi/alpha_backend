const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");

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
