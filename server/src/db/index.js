import mongoose from "mongoose"
import {dbName} from "../constants.js"
const connectDB = async()=>{
    try {
        const conInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`)
        console.log(`\n⚙ MongoDB connected successfully. \nDB HOST: ${conInstance.connection.host}`);
        
    } catch (error) {
        console.log("Database connection failed. ",error );
    }
}

export default connectDB