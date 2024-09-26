import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/index.js";
import authRoutes from "./routes/auth.routes.js";
import contactRoutes from "./routes/contacts.routes.js";
import setUpSocket from "./socket.js";
import messagesRoutes from "./routes/messages.routes.js";

dotenv.config({ path: "./.env" });

dotenv.config();

const app = express();

const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use("/uploads/profiles/", express.static("uploads/profiles/"));

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/messages", messagesRoutes);
connectDB()
  .then(() => {
    const server = app.listen(port, () => {
      console.log(`⚙ Server is running on the port ${port} `);

      app.on("error", (error) => {
        console.log("ERROR: db not able to listen express", error);
      });
      setUpSocket(server)
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed.", error);
    process.exit(1);
  });

  
