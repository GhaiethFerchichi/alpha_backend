const {
  generateAccessToken,
  generateRefreshToken,
} = require("../helpers/jwt_function");
const User = require("../models/Users.model");
/**
 * @swagger
 * tags:
 *   name: Login
 *   description: User authentication and authorization
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Logs in a user
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns access and refresh tokens
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       401:
 *         description: Invalid username or password
 */
const loginMethod = async (req, res) => {
  // Authenticate user (replace this with your actual authentication logic)
  const { username, password } = req.body;

  const users = await User.findAll();

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  console.log(user);
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  // Generate tokens
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  res.json({ accessToken, refreshToken });
};

const refreshToken = (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token is required" });
  }

  jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    delete user.password;
    const accessToken = generateAccessToken({
      user,
    });
    res.json({ accessToken });
  });
};

const protected = (req, res) => {
  res.json({ message: "Accessed protected resource with access token" });
};
module.exports = { loginMethod, refreshToken, protected };
