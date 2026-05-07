// middleware/authMiddleware.js

import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    // get authorization header(front)
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // remove Bearer from token (used in authorization)
    const token = authHeader.split(" ")[1];

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // save decoded user data
    req.user = decoded;

    next();
  } catch (err) {
    console.log("Auth Error:", err);
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default authMiddleware;