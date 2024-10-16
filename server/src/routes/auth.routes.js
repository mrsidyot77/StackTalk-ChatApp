import { Router } from "express";
import {
  login,
  signUp,
  getUserInfo,
  updateProfile,
  addProfileImage,
  removeProfileImage,
  logOut
} from "../controller/auth.controller.js";
import { varifyToken } from "../middlewares/auth.middleware.js";
import multer from "multer";

const upload = multer({ dest: "uploads/profiles/" });

const authRoutes = Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/login", login);
authRoutes.get("/user-info", varifyToken, getUserInfo);
authRoutes.post("/update-profile", varifyToken, updateProfile);
authRoutes.post(
  "/add-profile-image",
  varifyToken,
  upload.single("profile-image"),
  addProfileImage
);
authRoutes.delete("/remove-profile-image",varifyToken,removeProfileImage)
authRoutes.post("/logout",logOut)

export default authRoutes;
