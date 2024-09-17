import { Router } from "express";
import {
  login,
  signUp,
  getUserInfo,
  updateProfile,
} from "../controller/auth.controller.js";
import { varifyToken } from "../middlewares/auth.middleware.js";

const authRoutes = Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/login", login);
authRoutes.get("/user-info", varifyToken, getUserInfo);
authRoutes.post("/update-profile", varifyToken, updateProfile);

export default authRoutes;
