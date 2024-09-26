import { Server as socketIoServer } from "socket.io";
import Message from "./model/messages.model.js";

const setUpSocket = (server) => {
  const io = new socketIoServer(server, {
    cors: {
      origin: process.env.ORIGIN, // Ensure this environment variable is correctly set
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  const disconnect = (socket) => {
    console.log(`Client disconnected: ${socket.id}`);
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  const sendMessage = async (message) => {
    if (!message.sender || !message.recipient) {
      console.error("Message must have a sender and a recipient:", message);
      return;
    }

    const senderSocketId = userSocketMap.get(message.sender);
    const recipientSocketId = userSocketMap.get(message.recipient);

    const createdMessage = await Message.create(message);

    const messageData = await Message.findById(createdMessage._id)
      .populate("sender", "firstName lastName image color")
      .populate("recipient", "firstName lastName image color");

    if (recipientSocketId) {
      io.to(recipientSocketId).emit("recieveMessage", messageData);
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit("recieveMessage", messageData);
    }
  };

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User connected: ${userId} with Socket ID: ${socket.id}`);
    } else {
      console.log("User ID not provided during connection.");
    }

    socket.on("sendMessage", (message) => sendMessage(message));
    socket.on("disconnect", () => disconnect(socket));
  });
};

export default setUpSocket;
