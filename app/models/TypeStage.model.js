const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");

const Type_Stage = sequelize.define(
  "type_stage",
  {
    Type_Stage_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lib_Type_Stage_ara: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lib_Type_Stage_fr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Type_Stage",
    timestamps: true,
  }
);

module.exports = Type_Stage;
