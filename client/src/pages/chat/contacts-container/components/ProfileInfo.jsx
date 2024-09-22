import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui/tooltip";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {IoPowerSharp} from "react-icons/io5"

function ProfileInfo() {
  const navigate = useNavigate();
  const { userInfo } = useAppStore();
  return (
    <div className="h-16 absolute bottom-0 flex items-center justify-center px-10 w-full bg-[#2a2b33]">
      <div className="flex items-center justify-center gap-3">
        <div className="h-12 w-12 relative">
          <Avatar className="h-12 w-12  rounded-full overflow-hidder">
            {userInfo.image ? (
              <AvatarImage
                src={`${HOST}/${userInfo.image}`}
                alt="profileImage"
                className="w-full h-full object-cover bg-black rounded-full"
              />
            ) : (
              <div
                className={`uppercase h-12 w-12  text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                  userInfo.color
                )} `}
              >
                {userInfo.firstName
                  ? userInfo.firstName.split("").shift()
                  : userInfo.email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>
        <div>
          {userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : ""}
        </div>
      </div>
      <div className=" flex">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FaEdit
                className="text-xl text-purple-500 font-medium ml-3"
                onClick={() => navigate("/profile")}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              <p>Edit Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IoPowerSharp
                className="text-xl text-red-500 ml-3 font-medium"
                
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              <p>Log Out</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default ProfileInfo;
