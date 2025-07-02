import { Router } from "express";
import { createPost } from "../controllers/post.controller.js";

const route = Router();
route.get("/", (req, res) => {
  res.status(200).json({ message: "Route working fine" });
});

route.post("/create", createPost);

export { route as PostRouter };
