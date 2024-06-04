require("dotenv").config({ path: "./app/config/.env" });

const jwt = require("jsonwebtoken");

// Function to generate access tokens
const generateAccessToken = (user) =>
  jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

// Function to generate refresh tokens
const generateRefreshToken = (user) =>
  jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);

module.exports = { generateAccessToken, generateRefreshToken };
