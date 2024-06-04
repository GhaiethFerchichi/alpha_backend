const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");

const Supervisor = sequelize.define(
  "Supervisor",
  {
    supervisor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    contact_info: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "Supervisors",
    timestamps: true,
  }
);

module.exports = Supervisor;
