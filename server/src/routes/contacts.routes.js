import {Router} from "express"
import {varifyToken} from "../middlewares/auth.middleware.js"
import {searchContacts } from "../controller/contacts.controller.js"

const contactRoutes = Router()

contactRoutes.post("/search", varifyToken, searchContacts)

export default contactRoutes