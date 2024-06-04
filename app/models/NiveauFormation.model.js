const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");

const Niveau_foramtion = sequelize.define(
  "niveau_fomation",
  {
    niveau_fomation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code_niveau_fomation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lib_niveau_fomation_ara: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lib_niveau_fomation_fr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Niveau_foramtions",
    timestamps: true,
  }
);

module.exports = Niveau_foramtion;
