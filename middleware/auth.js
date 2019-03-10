const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) res.status(401).json({ msg: "User is Unauthorized" });

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get("JWT_SECRET"));
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Invalid Token" });
  }
}

module.exports = auth;
