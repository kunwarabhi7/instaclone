import express, { Router } from "express";
import {
  addComment,
  createPost,
  deleteComment,
  deletePost,
  getPost,
  likePost,
  updatePost,
} from "../controllers/post.controller.js";

const route = express.Router();

route.get("/", (req, res) => {
  res.status(200).json({ message: "Route working fine" });
});

route.post("/create", createPost);
route.patch("/:postId", updatePost);
route.get("/:postId", getPost);
route.delete("/:postId", deletePost);
route.post("/:postId/like", likePost);
route.post("/:postId/comments", addComment);
route.delete("/:postId/comments/:commentId", deleteComment);

export { route as PostRouter };
