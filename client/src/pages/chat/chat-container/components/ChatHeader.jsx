import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { Contact } from "lucide-react";
import React from "react";
import { RiCloseFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function ChatHeader() {

  const navigate = useNavigate()
  const { selectedChatData, closeChat ,selectedChatType } = useAppStore();
  console.log(selectedChatData);
  

  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px20 ">
      <div className="flex gap-5 items-center justify-between w-full">
        <div className="flex gap-3 items-center justify-center p-4">
          <div className="h-12 w-12 relative">
            <Avatar className="h-12 w-12  rounded-full overflow-hidder">
              {selectedChatData.image ? (
                <AvatarImage
                  src={`${HOST}/${selectedChatData.image}`}
                  alt="profileImage"
                  className="w-full h-full object-cover bg-black rounded-full"
                />
              ) : (
                <div
                  className={`uppercase cursor-pointer h-full w-full  text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                    selectedChatData.color
                  )} `}
                  onClick={()=> navigate("/profile")}
                >
                  {selectedChatData?.firstName // Check if firstName exists, fallback to email
                    ? selectedChatData.firstName.split("")[0] // Safely get first character
                    : selectedChatData?.email?.split("")[0] || "?"}{" "}
                  {/* Fallback to ? if no email */}
                </div>
              )}
            </Avatar>
          </div>
          <div className="flex flex-col">
                    <span>
                    {selectedChatType === "contact" && selectedChatData.firstName && selectedChatData.lastName
                      ? `${selectedChatData.firstName} ${selectedChatData.lastName}`
                      : `${selectedChatData.email}`}
                      </span>
                      
                  </div>
        </div>
        <div className="flex gap-5 justify-center items-center mr-4 ">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
            onClick={closeChat}
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
