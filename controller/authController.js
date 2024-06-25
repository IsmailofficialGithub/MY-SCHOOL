import userModel from "../models/userModel.js";
import { hashedPassword, comparePassword } from "../helper/hashedPassword.js";
import jwt from 'jsonwebtoken';
// register user
export const registerController = async (req, res) => {
  try {
    const { userId, password, answer } = req.body;
    if (!userId) {
      return res.status(200).send({
        success: false,
        message: "user Id requried",
      });
    }
    if (!password) {
      return res.status(200).send({
        success: false,
        message: "password requried",
      });
    }
    if (!answer) {
      return res.status(200).send({
        success: false,
        message: "answer Id requried",
      });
    }

    const existingUser = await userModel.findOne({ userId });
    if (existingUser) {
      return res.status(200).send({
        message: "user already exist please login",
        success: false,
        existingUser,
      });
    }

    const hash = await hashedPassword(password);
    const data = new userModel({ userId, password: hash, answer });
    await data.save();
    res.status(200).send({
      message: "registration successfully",
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in registration",
      error,
    });
  }
};

// login user

export const loginController = async (req, res) => {
  try {
    const { userId, password } = req.body;

    if (userId && password) {
      const user = await userModel.findOne({ userId });
               if (user) {
               const compare = await comparePassword(password, user?.password);
               if (compare) {
                    const token=jwt.sign(
                         {userId:user.userId,name:user.name},
                         process.env.JWT_SECRET,
                         {expiresIn:'7d'}
                    )
                    res.status(200).send({
                    success: true,
                    message: "Login Successfully",
                    user,
                    token
                    });
               } else {
                    res.status(200).send({
                    success: false,
                    message: "Invalid userId or password",
                    });
               }
               } else {
               res.status(300).send({
                    success: false,
                    message: "User not register",
               });
               }


    } else {
      return res.status(300).send({
        success: false,
        message: "UserId or password required",
      });
    }


  } catch (error) {
    console.log(error);
  }
};
