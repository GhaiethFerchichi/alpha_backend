// etudiant_stage.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");
const Etudiant = require("./Etudiant.model");
const Stage = require("./Stage.model");

const EtudiantStage = sequelize.define(
  "Soutenance",
  {
    etudiant_stage_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    stage_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Stage,
        key: "stage_id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    cin: {
      type: DataTypes.STRING,
      references: {
        model: Etudiant,
        key: "cin",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    note: { type: DataTypes.DECIMAL, allowNull: true },
    observation: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: "Soutenance",
    timestamps: true,
  }
);

module.exports = EtudiantStage;
