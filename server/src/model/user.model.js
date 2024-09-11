import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt, { genSalt, hash } from "bcrypt"

const userSchema = new Schema({
    email : {
        type: String,
        required : [true, "Email is required."],
        unique : true
    },
    password : {
        type: String,
        required : [true, "Password is required."],
        unique : true
    },
    firstName : {
        type: String,
        required : false
    },
    lastName : {
        type: String,
        required : false
    },
    image : {
        type: String,
        required : false
    },
    color : {
        type: Number,
        required : false
    },
    profileSetup : {
        type: Boolean,
        required : false
    },
},{timestamps:true})

userSchema.pre("save" , async function(){
    const salt = await genSalt()
    this.password = await hash(this.password, salt)
    next()
 })

export const User = mongoose.model("User", userSchema )