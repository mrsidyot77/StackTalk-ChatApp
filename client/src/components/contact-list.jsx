import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";

const ContactList = ({ contacts, isChannel = false }) => {
  const {
    selectedChatType,
    setSelectedChatType,
    selectedChatData,
    setSelectedChatData,
    setSelectedChatMessages,
  } = useAppStore();

  const handleClick = (contact) => {
    if (isChannel) setSelectedChatType("channel");
    else setSelectedChatType("contact");
    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessages([]);
    }
  };

  return (
    <div className="mt-5">
      {/* Check if contacts is defined and is an array */}
      {Array.isArray(contacts) && contacts.length > 0 ? (
        contacts.map((contact) => (
          <div
            key={contact._id}
            className={`p-10 py-2 transition-all duration-300 cursor-pointer ${
              selectedChatData && (selectedChatData._id === contact._id)
                ? "bg-[#421c6d] hover:bg-[#421c6d]"
                : "hover:bg-[#f1f1f111]"
            }`}
            onClick={() => handleClick(contact)}
          >
            <div className="flex gap-5 items-center justify-start text-neutral-300">
              {
                !isChannel && 
                  
                    <Avatar className="h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden">
                    {contact.image ? (
                      <AvatarImage
                        src={`${HOST}/${contact.image}`}
                        alt="profileImage"
                        className="w-full h-full object-cover bg-black rounded-full"
                      />
                    ) : (
                      <div
                        className={`uppercase cursor-pointer h-full w-full text-base md:text-lg border flex items-center justify-center rounded-full ${getColor(
                          contact.color
                        )}`}
                        onClick={() => navigate("/profile")}
                      >
                        {contact?.firstName
                          ? contact.firstName.charAt(0)
                          : contact?.email?.charAt(0) || "?"}
                      </div>
                    )}
                  </Avatar>
                
              }
            {
              isChannel && <div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full"  >#</div>
            }
            {
              isChannel ?<span>{contact.name}</span>: <span>{contact.firstName} {contact.lastName}</span>
            }
            </div>
          </div>
        ))
      ) : (
        <p>No contacts available</p>
      )}
    </div>
  );
};

export default ContactList;
