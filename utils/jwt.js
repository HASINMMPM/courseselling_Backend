import jwt from 'jsonwebtoken'
import dotenv from "dotenv"

// get config vars
dotenv.config();

// access config var
process.env.jwtsec_Key;
export function generateAccessToken(email) {
    return jwt.sign({email:email}, process.env.jwtsec_Key, { expiresIn: '1d' });
  }