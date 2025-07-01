import { validationResult } from "express-validator";
import { User } from "../models/user.model.js";
import {
  loginValidation,
  profileValidation,
  signUpValidation,
} from "../utils/validator.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { verifyToken } from "../middleware/auth.js";
import { BlacklistedToken } from "../models/blacklistedToken.model.js";

export const signUp = [
  signUpValidation,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: errors.array() });
    }

    const {
      userName,
      password,
      email,
      phoneNumber,
      fullName,
      bio,
      profilePic,
    } = req.body;

    try {
      const user = new User({
        userName,
        password,
        email,
        phoneNumber,
        fullName,
        bio: bio || "",
        profilePic: profilePic || "",
      });

      await user.save();

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email || null,
          phoneNumber: user.phoneNumber || null,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(201).json({
        message: "User created successfully",
        user: {
          id: user._id,
          userName: user.userName,
          fullName: user.fullName,
          phoneNumber: user.phoneNumber,
          email: user.email,
          bio: user.bio,
          profilePic: user.profilePic,
          followersCount: user.followersCount,
          followingCount: user.followingCount,
          postsCount: user.postsCount,
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

export const login = [
  loginValidation, // Fixed from loginValidator
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: errors.array() });
    }

    const { identifier, password } = req.body;

    try {
      const user = await User.findOne({
        $or: [
          { userName: identifier.toLowerCase() },
          { email: identifier.toLowerCase() },
          { phoneNumber: identifier },
        ],
      });

      if (!user) {
        return res.status(401).json({
          message: "Invalid username, email, phone number, or password",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid username, email, phone number, or password",
        });
      }

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
        message: "Login successful", // Fixed typo from Successfull
        user: {
          id: user._id,
          userName: user.userName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          fullName: user.fullName,
          bio: user.bio,
          profilePic: user.profilePic,
          followersCount: user.followersCount,
          followingCount: user.followingCount,
          postsCount: user.postsCount,
        },
        token,
      });
    } catch (error) {
      console.error("Error while logging in:", error.message);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },
];

export const logout = [
  verifyToken,
  async (req, res) => {
    try {
      const token = req.headers["authorization"].split(" ")[1];
      await BlacklistedToken.create({
        token,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      });
      return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error("Error while logging out:", error.message);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },
];

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }
    res.status(200).json({
      message: "Profile fetched successfully",
      user: {
        id: user._id,
        userName: user.userName,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        bio: user.bio,
        profilePic: user.profilePic,
        followersCount: user.followersCount,
        followingCount: user.followingCount,
        postsCount: user.postsCount,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const updateProfile = [
  verifyToken,
  profileValidation,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res
        .status(404)
        .json({ message: "Validation failed", errors: errors.array() });
    }

    const { bio, profilePic, fullName } = req.body;
    try {
      // update User
      const updateData = {};
      if (bio !== undefined) updateData.bio = bio;
      if (profilePic !== undefined) updateData.profilePic = profilePic;
      if (fullName !== undefined) updateData.fullName = fullName;

      const user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: updateData, updatedAt: new Date() },
        { new: true, runValidators: true, select: "-password" }
      );
      if (!user) {
        return res.status(400).json({ message: "User not Found" });
      }

      await user.save();
      return res.status(200).json({
        message: "User Updated Successfully",
        user: {
          id: user._id,
          userName: user.userName,
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          bio: user.bio,
          profilePic: user.profilePic,
          followersCount: user.followersCount,
          followingCount: user.followingCount,
          postsCount: user.postsCount,
        },
      });
    } catch (error) {
      console.error("Error updating profile:", error.message);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },
];
