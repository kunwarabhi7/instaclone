import { Router } from "express";
import { login, logout, signUp } from "../controllers/user.controller.js";

const router = Router();
router.get("/", (req, res) => {
  res.status(200).json({ message: "Router is working fine yo" });
});

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);

export { router as userRouter };
