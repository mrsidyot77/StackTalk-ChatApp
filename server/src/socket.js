import { Socket, Server as socketIoSever } from "socket.io";

const setUpSocket = (server) => {
  const io = new socketIoSever(server, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  const disconnect = (socket) => {
    console.log(`Client disconnect:  ${socket.id}`);
    for(const [userId, socketId] of userSocketMap.entries()){
        if (socketId === socket.id) {
            userSocketMap.delete(userId)
            break;
        }
    }
  };
  io.on("connection", (socket) => {
    const userId = socket.handshake.userId;

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User is connected: ${userId} with Socket Id: ${socket.id}`);
    } else {
      console.log("User Id not provided during connection.");
    }
    socket.io("disconnet", () => disconnect(socket));
  });
};

export default setUpSocket;
