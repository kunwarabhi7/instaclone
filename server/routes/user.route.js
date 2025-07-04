import { Router } from "express";
import {
  getProfile,
  login,
  logout,
  signUp,
  toggleFollow,
  updateProfile,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();
router.get("/", (req, res) => {
  res.status(200).json({ message: "Router is working fine yo" });
});

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", verifyToken, getProfile);
router.patch("/profile", verifyToken, updateProfile);
router.post("/follow/:userId", toggleFollow);

export { router as userRouter };
