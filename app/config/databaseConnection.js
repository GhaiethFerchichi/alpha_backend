const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("alpha", "root", "", {
  host: "localhost",
  dialect: "mysql",
  username: "root",
  password: "",
  database: "alpha",
});

module.exports = sequelize;
