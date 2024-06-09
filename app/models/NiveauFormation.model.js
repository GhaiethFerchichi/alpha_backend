const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");

const Niveau_formation = sequelize.define(
  "niveau_formation",
  {
    niveau_formation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code_niveau_formation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lib_niveau_formation_fr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lib_niveau_formation_ara: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Niveau_formations",
    timestamps: true,
  }
);

module.exports = Niveau_formation;
