import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Require sign IN

export const requireSignIn = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({
      message: "please provide token in headers",
    });
  }
  try {
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Invalid token." });
  }
};




// isAdmin

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user?.role !== 3) {
      return res.status(400).send({
        success: false,
        message: "Unauthorized access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.send('error in admin middleware')
  }
};
