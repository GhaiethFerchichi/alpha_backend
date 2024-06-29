const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");

const Organisme = sequelize.define(
  "Organisme",
  {
    organisme_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lib_organisme: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fax: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    adresse: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: { type: DataTypes.STRING, allowNull: false },
    site_web: { type: DataTypes.STRING, allowNull: true },
    geoloc: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: "Organisme",
    timestamps: true,
  }
);

module.exports = Organisme;
