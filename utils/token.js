const jwt = require("jsonwebtoken");
require("dotenv").config();

const signToken = (payload) =>
  jwt.sign(
    {
      data: payload,
    },
    process.env.JWT_KEY,
    { expiresIn: process.env.JWT_EXPIRY }
  );

const verifyToken = (token) => jwt.verify(token, process.env.JWT_KEY);

module.exports = { signToken, verifyToken};
