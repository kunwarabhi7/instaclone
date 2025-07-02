import { validationResult } from "express-validator";
import { verifyToken } from "../middleware/auth.js";
import { postUpload } from "../utils/cloudinary.js";
import {
  postValidation,
  updatePostValidation,
} from "../utils/postValidation.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";

export const createPost = [
  verifyToken,
  postUpload.single("image"),
  postValidation,
  async (req, res) => {
    //handle mutlter error
    if (req.fileValidationError) {
      return res.status(400).json({ message: "Invalid file format or size" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: errors.array() });
    }
    const { caption } = req.body;
    try {
      if (!req.file) {
        return res.status(400).json({ message: "image is required" });
      }
      const post = new Post({
        userId: req.user.id,
        image: req.file.path,
        caption: caption || "",
      });
      await post.save();
      const user = await User.findByIdAndUpdate(
        req.user.id,
        {
          $inc: { postsCount: 1 },
        },
        { new: true, select: "-password" }
      );
      if (!user) {
        return res.status(404).json({ message: "User not Found" });
      }
      return res.status(201).json({
        message: "Post Created Successfully",
        post: {
          id: post._id,
          userId: post.userId,
          image: post.image,
          caption: post.caption,
          likesCount: post.likesCount,
          commentsCount: post.commentsCount,
          createdAt: post.createdAt,
        },
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
      console.error("Error creating post:", error.message);
      if (error.name === "MulterError") {
        return res.status(400).json({
          message: `File upload error: ${error.message}. Ensure the file is sent with field name 'image'`,
        });
      }
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },
];

export const updatePost = [
  verifyToken,
  updatePostValidation,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: errors.array() });
    }
    const { caption } = req.body;
    const postId = req.params.postId;
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not Found" });
      }
      //check if user is Same as the owner of the Post
      if (post.userId.toString() !== req.user.id) {
        return res
          .status(403)
          .json({ message: "You are not Authorized to update the post" });
      }
      // update the caption
      post.caption = caption || post.caption;
      await post.save();

      //fetch Updated User Data
      const user = await User.findById(req.user.id, "-password");
      return res.status(200).json({
        message: "Post Updated Successfully",
        post: {
          id: post._id,
          userId: post.userId,
          image: post.image,
          caption: post.caption,
          likesCount: post.likesCount,
          commentsCount: post.commentsCount,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        },
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
      console.error("Error updating post:", error.stack);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },
];

export const getPost = async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not Found" });
    }
    return res.status(200).json({ message: "Post Fetched Successfully", post });
  } catch (error) {
    console.error("Error updating post:", error.stack);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
