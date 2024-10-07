import mongoose from "mongoose";
import Message from "../model/messages.model.js";
import { response } from "express";
import fs, { mkdir, mkdirSync, renameSync } from "fs"

export const getMessages = async (req, res, next) => {
  try {
    const user1 = req.userId;
    const user2 = req.body.id;

    if (!user1 || !user2) {
      res.status(400).send("Both user Id's are required.");
    }

    const messages = await Message.find({
      $or: [
        { sender: user1, recipient: user2 },
        { sender: user2, recipient: user1 },
      ],
    }).sort({ timestamps: 1 });
    return res.status(200).send({ messages });
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internal server error.");
  }
};

export const uploadFiles = async (req, res, next) => {
  try {
   if (!req.file) {
    return response.status(400).send("Files is required.")
   }

   const date = Date.now()
   let fileDir = `uploads/files/${date}`
   let fileName = `${fileDir}/${req.file.originalname}`

   mkdirSync(fileDir, {recursive: true})
   renameSync(req.file.path, fileName)

    return res.status(200).send({ filePath : fileName });
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internal server error.");
  }
};
