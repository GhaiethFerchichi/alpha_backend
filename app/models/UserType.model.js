const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");

const UserType = sequelize.define(
  "User_Type",
  {
    user_type_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lib_user_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "UserTypes",
    timestamps: true,
  }
);

module.exports = UserType;
