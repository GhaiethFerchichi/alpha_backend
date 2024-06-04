const { DataTypes } = require("sequelize");
const sequelize = require("../config/databaseConnection");

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    user_type: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "Users",
    timestamps: true,
  }
);

module.exports = User;
