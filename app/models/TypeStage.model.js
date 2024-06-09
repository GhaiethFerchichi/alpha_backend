const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");

const Type_Stage = sequelize.define(
  "type_stage",
  {
    type_stage_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code_type_stage: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    lib_Type_Stage_fr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lib_Type_Stage_ara: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Type_Stage",
    timestamps: true,
  }
);

module.exports = Type_Stage;
