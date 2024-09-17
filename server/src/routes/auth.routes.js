import {Router} from "express"
import { login, signUp,getUserInfo } from "../controller/auth.controller.js"
import { varifyToken } from "../middlewares/auth.middleware.js"

const authRoutes = Router()

authRoutes.post("/signup",signUp)
authRoutes.post("/login",login)
authRoutes.get("/user-info",varifyToken,getUserInfo)
export default authRoutes