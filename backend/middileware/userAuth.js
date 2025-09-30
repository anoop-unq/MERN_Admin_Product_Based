import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userModel from '../models/user.js';

dotenv.config();

export const userAuthMiddleware = async (req, res, next) => {
  console.log("Request Cookies:", req.cookies); 
  const  token = req.cookies.token;
  console.log("token",token)
  if (!token) {
    return res.json({
      success: false,
      message: "Not authorized. Please log in again.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    
    // Attach user ID to the request for future use
    req.userId = decoded.id;

    next(); // Proceed to the next middleware/controller
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.json({
      success: false,
      message: "Invalid or expired token. Please log in again.",
    });
  }
};


export const adminAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please log in again.",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.id;

    // Check if user is admin
    const user = await userModel.findById(req.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
      });
    }

    next();
  } catch (error) {
    console.error("Admin middleware error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please log in again.",
    });
  }
};
