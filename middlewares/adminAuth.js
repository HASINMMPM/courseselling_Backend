import jwt from "jsonwebtoken";
import "dotenv/config";

export const authAdmin = (req, res, next) => {
    const token = req.cookies.token
  jwt.verify(token, process.env.jwtsec_Key, function (err, decoded) {
    if (err) {
        console.log("Error : ",err)
      return res.status(401).json({ error: "Invalid Token" });
    }
    console.log(decoded); 
    if (decoded.role ==="admin") {
      next();
    } else {
      return res.status(401).json({ error: "Sorry you'r not an admin" });
    }
  });
};
