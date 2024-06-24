const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");

const Departement = sequelize.define(
  "Departement",
  {
    departement_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code_departement: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lib_departement_ara: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lib_departement_fr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Departement",
    timestamps: true,
  }
);

module.exports = Departement;
