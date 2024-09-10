import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/index.js";

dotenv.config({ path: "./.env" });

dotenv.config();

const app = express();

const port = process.env.PORT || 3001;

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET","POST","PUT","DELETE","PATCH"],
    credintials: true
}))

app.use(cookieParser())
app.use(express.json())

connectDB()
.then(()=>{
  app.listen(port, () => {
    console.log(`⚙ Server is running on the port ${port} `);
   
    
    app.on("error",(error)=>{
        console.log("ERROR: db not able to listen express", error);
    })
})
})
.catch((error)=>{
    console.log("MongoDB connection failed.",error);
    process.exit(1)
    
})

