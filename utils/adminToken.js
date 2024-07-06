import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

function adminToken(user) {
  return jwt.sign({ data: user.email, role: user.role }, process.env.jwtsec_Key, {
    expiresIn: "1d",
  });
}

export default adminToken;