import { validationResult } from "express-validator";
import { User } from "../models/user.model.js";
import { signUpValidation } from "../utils/validator.js";
import jwt from "jsonwebtoken";

export const signUp = [
  signUpValidation,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: errors.array() });
    }
    const { userName, password, email, phoneNumber, fullName } = req.body;
    try {
      const user = new User({
        userName,
        password,
        email,
        phoneNumber,
        fullName,
      });
      await user.save();
      //token
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email || null,
          phoneNumber: user.phoneNumber || null,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        message: "User Created Successfully",
        user: {
          id: user._id,
          userName: user.userName,
          fullName: user.fullName,
          phoneNumber: user.phoneNumberm,
          email: user.email,
        },
        token,
      });
    } catch (error) {
      // Handle duplicate key errors
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        return res.status(400).json({ message: `${field} already exists` });
      }
      // Handle validation errors
      if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map((err) => err.message);
        return res.status(400).json({ message: messages.join(", ") });
      }
      console.error("Error while creating user:", error.message);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },
];

export const login = async (req, res) => {};

export const logout = async (req, res) => {};
