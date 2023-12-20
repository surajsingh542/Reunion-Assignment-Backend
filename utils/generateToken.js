const jwt = require("jsonwebtoken");

const generateToken = (id, expiresIn = "24h") => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn });
};

module.exports = generateToken;
