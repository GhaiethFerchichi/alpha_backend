const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");

const Classe = sequelize.define(
  "Classe",
  {
    classe_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code_classe: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lib_classe_ara: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lib_classe_fr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Classe",
    timestamps: true,
  }
);

module.exports = Classe;
