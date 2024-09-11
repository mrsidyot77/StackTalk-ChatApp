import {User} from "../model/user.model.js" 
import jwt  from "jsonwebtoken"

const maxAge = 3*24*60*60*1000
const createToken = (email,userId)=>{
    return jwt.sign({email,userId},process.env.JWT_KEY,{expiresIn: maxAge})
}

export const signUp = async(req,res,next)=>{
    try {
        const {email,password} = req.body 
        if(!email || !password){
            res.status(400).send("Email and password are required.")
        }
        const existedUser = await User.findOne({email})
        if (existedUser){
            res.status(401).send("Email already exists.")
        }
        const user = await User.create({email,password})
        res.coockie("jwt",createToken(email,user._id)),{
            maxAge,
            secure: true,
            sameSite: "None"
        }
        return res.status(201).json({
            id: user._id,
            email: user.email,
            profileSetup: user.profileSetup
        })

    } catch (error) {
        console.log({error});
        return res.status(500).send("Internel server error.")
    }
}