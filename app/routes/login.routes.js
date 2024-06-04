const { loginMethod, protected } = require("../controllers/Login.controller");
const { authenticateToken } = require("../middlewares/auth_functions");

const loginRouter = require("express").Router();

loginRouter.route("/").post(loginMethod);
loginRouter.route("/protected").get(authenticateToken, protected);

module.exports = loginRouter;
