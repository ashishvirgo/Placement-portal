import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const authMiddleware = (req, res, next) => {
  const SECRET_KEY = process.env.SECRET_KEY;
  try {
    const token = req.headers.authorization?.split(" ")[1];
console.log("TOKEN:", token);
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
   console.log("Level-1")
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("DECODED =", decoded);
    console.log("Level-2")
    req.user = decoded; // attach user data to request
    console.log("req.user=",req.user)
    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;