const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");

const Jure = sequelize.define(
  "Jure",
  {
    jure_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    jure_nom_prenom: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Jure",
    timestamps: true,
  }
);

module.exports = Jure;
