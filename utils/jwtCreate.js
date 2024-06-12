const jsonwebTocken = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const secretKey = process.env.secKey;

const generateToken = (email) => {
  return jsonwebTocken.sign({ data: email }, secretKey, { expiresIn: "1d" });
};

module.exports = generateToken;
