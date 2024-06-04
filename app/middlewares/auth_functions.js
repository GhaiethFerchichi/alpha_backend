const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // console.log(req.headers);

  if (!token) {
    return res.status(401).json({ error: "Access token is required" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
    if (err) {
      return res.status(403).json({ error: "Invalid access token" });
    }
    req.token = authData;
    next();
  });
};

module.exports = { authenticateToken };
