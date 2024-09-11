import {Router} from "express"
import { signUp } from "../controller/auth.controller.js"

const authRoutes = Router()

authRoutes.post("/signup",signUp)
export default authRoutes