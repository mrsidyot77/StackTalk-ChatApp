import { Socket, Server as socketIoServer } from "socket.io";

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
    console.log(`Client disconnected: ${socket.id}`); // Use `socket.id` instead of `_id`
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  io.on("connection", (socket) => {
    // Use `socket.handshake.query.userId` to retrieve userId from the query
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap.set(userId, socket.id); // Use `socket.id` (not `_id`)
      console.log(`User connected: ${userId} with Socket ID: ${socket.id}`);
    } else {
      console.log("User ID not provided during connection.");
    }

    // Corrected the event name from "disconnet" to "disconnect"
    socket.on("disconnect", () => disconnect(socket));
  });
};

export default setUpSocket;
