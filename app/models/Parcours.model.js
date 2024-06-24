const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");

const Parcour = sequelize.define(
  "Parcour",
  {
    parcour_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code_parcour: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lib_parcour_ara: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lib_parcour_fr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Parcour",
    timestamps: true,
  }
);

module.exports = Parcour;
