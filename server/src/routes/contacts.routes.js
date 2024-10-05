import {Router} from "express"
import {varifyToken} from "../middlewares/auth.middleware.js"
import {searchContacts, getContactsForDMList } from "../controller/contacts.controller.js"


const contactRoutes = Router()

contactRoutes.post("/search", varifyToken, searchContacts)
contactRoutes.get("/get-contacts-for-dm", varifyToken, getContactsForDMList)

export default contactRoutes