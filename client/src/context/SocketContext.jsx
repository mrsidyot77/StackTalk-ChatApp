import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { io } from "socket.io-client";
import { createContext, useContext, useEffect, useRef } from "react";

// Create the socket context
const SocketContext = createContext(null); 

// Custom hook to access the socket context
export const useSocket = () => {
  return useContext(SocketContext); 
};

export const SocketProvider = ({ children }) => {
  const socket = useRef(); 
  const { userInfo } = useAppStore(); 

  useEffect(() => {
    
    if (userInfo) {
      // Initialize the socket connection only if `userInfo` exists
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });

      socket.current.on("connect", () => {
        console.log("Connected to socket server successfully.");
      });

      // Add the "recieveMessage" event listener inside the useEffect
      const handleRecievedMessage = (message) => {
        const { selectedChatData, selectedChatType, addMessage } = useAppStore.getState();

        if (
          selectedChatType !== undefined &&
          (selectedChatData._id === message.sender._id ||
            selectedChatData._id === message.recipient._id)
        ) {
          console.log("rcv message");
          
          addMessage(message);
        }
      };

      socket.current.on("recieveMessage", handleRecievedMessage);

      // Cleanup: disconnect the socket and remove the event listener when the component unmounts
      return () => {
        socket.current.off("recieveMessage", handleRecievedMessage);
        socket.current.disconnect();
      };
    }
  }, [userInfo]); 

  return (
    <SocketContext.Provider value={socket.current}>
      {children} 
    </SocketContext.Provider>
  );
};
