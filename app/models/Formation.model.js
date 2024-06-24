const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");

const Formation = sequelize.define(
  "Formation",
  {
    formation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code_formation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lib_formation_ara: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lib_formation_fr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Formation",
    timestamps: true,
  }
);

module.exports = Formation;
