const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");

const Encadrant = sequelize.define(
  "Encadrant",
  {
    encadrant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    contact_info: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Encadrant",
    timestamps: true,
  }
);

module.exports = Encadrant;
