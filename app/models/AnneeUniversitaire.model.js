const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");

const Annee_Universitaire = sequelize.define(
  "Annee_Universitaire",
  {
    annéee_universitaire_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    annee_universitaire: {
      type: DataTypes.STRING(9),
      allowNull: false,
    },
  },
  {
    tableName: "Annee_Universitaire",
    timestamps: true,
  }
);

module.exports = Annee_Universitaire;
