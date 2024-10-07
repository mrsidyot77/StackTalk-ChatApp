import { Router } from "express";
import { varifyToken } from "../middlewares/auth.middleware.js";
import { getMessages, uploadFiles } from "../controller/messages.controller.js";
import multer from "multer";

const messagesRoutes = Router();

const upload = multer({ dest: "uploads/files" });
messagesRoutes.post("/get-messages", varifyToken, getMessages);
messagesRoutes.post("/upload-files", varifyToken, upload.single("file"),uploadFiles);

export default messagesRoutes;
