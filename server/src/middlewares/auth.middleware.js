import jwt from "jsonwebtoken"

export const varifyToken = (req,res,next)=>{
    
    const token = req.cookies.jwt
    
    if (!token) {
        return res.status(401).send("You are not authorized ")
    }
    jwt.verify(token, process.env.JWT_KEY,async(err,payload)=>{
        if(err) return res.status(403).send("Token is invalid or expired.")
            req.userId = payload.userId
        next()
    })
}