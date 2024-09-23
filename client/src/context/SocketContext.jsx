import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { io } from "socket.io-client";
import { createContext, useContext, useEffect, useRef } from "react";

// Create the socket context
const SocketContext = createContext(null); // Renamed from `socketContext` to avoid confusion

// Custom hook to access the socket context
export const useSocket = () => {
  return useContext(SocketContext); // Use the correct context (SocketContext)
};

export const SocketProvider = ({ children }) => {
  const socket = useRef(); // Create a ref to store the socket instance
  const { userInfo } = useAppStore(); // Access user information from the app store

  useEffect(() => {
    console.log(userInfo);
    
    if (userInfo) {
      // Initialize the socket connection only if `userInfo` exists
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id }, // Pass the user ID to the socket server
      });

      socket.current.on("connect", () => {
        console.log("Connected to socket server successfully.");
      });

      // Cleanup: disconnect the socket when the component unmounts
      return () => {
        socket.current.disconnect();
      };
    }
  }, [userInfo]); // Re-run the effect when `userInfo` changes

  return (
    // Use SocketContext.Provider to pass the socket instance to the component tree
    <SocketContext.Provider value={socket.current}>
      {children} {/* Render children components within the context */}
    </SocketContext.Provider>
  );
};
