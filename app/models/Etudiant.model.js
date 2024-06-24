const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");

const Etudiant = sequelize.define(
  "Etudiant",
  {
    cin: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    dte_naiss: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    phone_nbr: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "Etudiant",
    timestamps: true,
  }
);

module.exports = Etudiant;
