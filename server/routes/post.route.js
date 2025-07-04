import express from "express";
import {
  addComment,
  createPost,
  deleteComment,
  deletePost,
  getPost,
  likePost,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Route working fine" });
});

router.post("/create", createPost);
router.patch("/:postId", updatePost);
router.get("/:postId", getPost);
router.delete("/:postId", deletePost);
router.post("/:postId/like", likePost);
router.post("/:postId/comments", addComment);
router.delete("/:postId/comments/:commentId", deleteComment);

export { router as PostRouter };
