import React, { useState } from "react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Lottie from "react-lottie";
import { animationDefaultOptions, getColor } from "@/lib/utils";
import { FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/api-client";
import { HOST, SEARCH_CONTACTS_ROUTES } from "@/utils/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";

function NewDm() {
  const [openNewContactModel, setOpenNewContactModel] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);
  const { setSelectedChatType, setSelectedChatData } = useAppStore();

  const searchContacts = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const response = await apiClient.post(
          SEARCH_CONTACTS_ROUTES,
          { searchTerm },
          { withCredentials: true }
        );
        console.log(response);

        if (response.status === 200 && response.data.contacts) {
          setSearchedContacts(response.data.contacts);
        }
      } else {
        setSearchedContacts([]);
      }
    } catch (error) {
      console.log(error, "while searching contacts");
    }
  };

  const selectNewContact = (contact) => {
    setOpenNewContactModel(false);
    setSelectedChatType("contact");
    setSelectedChatData(contact);
    setSearchedContacts([]);
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-500 mr-12 text-opacity-90 font-light text-sm sm:text-base md:text-lg hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setOpenNewContactModel(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none text-white mb-2 p-2 sm:p-3">
            Select Contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openNewContactModel} onOpenChange={setOpenNewContactModel}>
        <DialogContent className="bg-[#181920] border-none text-white w-[90%] sm:w-[400px] h-[90%] sm:h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg md:text-xl">Please Select a Contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search Contacts"
              className="rounded-lg p-4 sm:p-6 bg-[#2c2e3b] border-none text-sm sm:text-base"
              onChange={(e) => searchContacts(e.target.value)}
            />
          </div>
          <ScrollArea className="h-[200px] sm:h-[250px] mt-2 sm:mt-4">
            <div className="flex flex-col gap-2 sm:gap-3">
              {searchedContacts.map((contact) => (
                <div
                  key={contact._id}
                  className="items-center flex gap-2 sm:gap-3 cursor-pointer p-2 sm:p-3 rounded-lg hover:bg-[#1c1d25] transition-colors duration-300"
                  onClick={() => selectNewContact(contact)}
                >
                  <div className="h-10 w-10 sm:h-12 sm:w-12 relative">
                    <Avatar className="h-full w-full rounded-full overflow-hidden">
                      {contact.image ? (
                        <AvatarImage
                          src={`${HOST}/${contact.image}`}
                          alt="profileImage"
                          className="w-full h-full object-cover bg-black rounded-full"
                        />
                      ) : (
                        <div
                          className={`uppercase h-full w-full text-xs sm:text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                            contact.color
                          )}`}
                        >
                          {contact.firstName
                            ? contact.firstName.charAt(0)
                            : contact.email.charAt(0)}
                        </div>
                      )}
                    </Avatar>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm sm:text-base">
                      {contact.firstName && contact.lastName
                        ? `${contact.firstName} ${contact.lastName}`
                        : `${contact.email}`}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-400">
                      {contact.email}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          {searchedContacts.length <= 0 && (
            <div className="flex-1 flex flex-col justify-center items-center duration-1000 transition-all mt-4 mb-14">
              <Lottie
                isClickToPauseDisabled={true}
                height={80}
                width={80}
                
                options={animationDefaultOptions}
              />
              <div className="text-opacity-80 text-white flex flex-col items-center mt-4 gap-3 text-sm sm:text-xl transition-all duration-300 text-center">
                <h3 className="font-medium">
                  Search new
                  <span className="text-purple-500"> Contact... </span>
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NewDm;
