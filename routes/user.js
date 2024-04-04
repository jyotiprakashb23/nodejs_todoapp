import express from "express";
import {
  getAllUsers,
  getMyProfile,
  logIn,
  logOut,
  register,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", register);
router.post("/login", logIn);
router.get("/me", isAuthenticated, getMyProfile);
router.get("/logout", logOut);
router.get("/all", getAllUsers);

export default router;
