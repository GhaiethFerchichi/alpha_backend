const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");

const Parcours = sequelize.define(
  "Parcours",
  {
    parcours_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code_parcours: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lib_parcours_ara: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lib_parcours_fr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Parcours",
    timestamps: true,
  }
);

module.exports = Parcours;
