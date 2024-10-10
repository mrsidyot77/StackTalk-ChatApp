import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import React from "react";
import { RiCloseFill, RiArrowLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function ChatHeader() {
  const navigate = useNavigate();
  const { selectedChatData, closeChat, selectedChatType } = useAppStore();

  return (
    <div className="h-[60px] md:h-[80px] border-b-2 border-[#2f303b] flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center space-x-3">
        <button
          className="md:hidden text-neutral-500 focus:outline-none focus:text-white"
          onClick={closeChat}
        >
          <RiArrowLeftLine className="text-2xl" />
        </button>
        <Avatar className="h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden">
          {selectedChatData.image ? (
            <AvatarImage
              src={`${HOST}/${selectedChatData.image}`}
              alt="profileImage"
              className="w-full h-full object-cover bg-black rounded-full"
            />
          ) : (
            <div
              className={`uppercase  h-full w-full text-base md:text-lg border flex items-center justify-center rounded-full ${getColor(
                selectedChatData.color
              )}`}
              
            >
              {selectedChatData?.firstName
                ? selectedChatData.firstName.charAt(0)
                : selectedChatData?.email?.charAt(0) || "?"}
            </div>
          )}
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm md:text-base font-medium truncate max-w-[150px] md:max-w-none">
            {selectedChatType === "contact" &&
            selectedChatData.firstName &&
            selectedChatData.lastName
              ? `${selectedChatData.firstName} ${selectedChatData.lastName}`
              : selectedChatData.email}
          </span>
        </div>
      </div>
      <button
        className="hidden md:block text-neutral-500 focus:outline-none focus:text-white transition-all duration-300"
        onClick={closeChat}
      >
        <RiCloseFill className="text-2xl" />
      </button>
    </div>
  );
}

export default ChatHeader;