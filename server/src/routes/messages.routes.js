import { Router } from "express";
import { varifyToken } from "../middlewares/auth.middleware.js";
import { getMessages } from "../controller/messages.controller.js";

const messagesRoutes = Router()

messagesRoutes.post("/get-messages", varifyToken, getMessages)

export default messagesRoutes