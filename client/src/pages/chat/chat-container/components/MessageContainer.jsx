import { MdOutlineFolderZip } from "react-icons/md";
import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store";
import { GET_MESSAGES_ROUTES, HOST } from "@/utils/constants";
import moment from "moment";
import React, { useRef, useEffect, useState } from "react";
import { IoMdArrowRoundDown } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

function MessageContainer() {
  const scrollRef = useRef();
  const [previousMessagesLength, setPreviousMessagesLength] = useState(0);
  const {
    selectedChatType,
    selectedChatData,
    selectedChatMessages,
    setSelectedChatMessages,
  } = useAppStore();
  const [enlargedImage, setEnlargedImage] = useState(null);

  const getMessages = async () => {
    try {
      const response = await apiClient.post(
        GET_MESSAGES_ROUTES,
        { id: selectedChatData._id },
        { withCredentials: true }
      );
      if (response.data.messages) {
        setSelectedChatMessages(response.data.messages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedChatData._id) {
      if (selectedChatType === "contact") getMessages();
    }
  }, [selectedChatType, selectedChatData]);

  useEffect(() => {
    if (
      scrollRef.current &&
      selectedChatMessages.length !== previousMessagesLength
    ) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
      setPreviousMessagesLength(selectedChatMessages.length);
    }
  }, [selectedChatMessages, previousMessagesLength]);

  const downloadFile = async (url) => {
    try {
      const response = await apiClient.get(`${HOST}/${url}`, {
        responseType: "blob",
      });
      const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = urlBlob;
      link.setAttribute("download", url.split("/").pop());
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(urlBlob);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const checkIfImage = (filePath) => {
    const imageRegex =
      /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
    return imageRegex.test(filePath);
  };

  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timestamp).format("LL")}
            </div>
          )}

          {selectedChatType === "contact" && renderDmMessages(message)}
        </div>
      );
    });
  };

  const renderDmMessages = (message) => (
    <div
      className={`${
        message.sender === selectedChatData._id ? "text-left" : "text-right"
      }`}
    >
      {message.messageType === "text" && (
        <div
          className={`${
            message.sender !== selectedChatData._id
              ? "bg-[#8417ff]/5 text-[#ffff]/90 border-[#8417ff]/50"
              : "bg-[#2a2b33]/5 text-white/80 border-[#ffff]/20"
          } border inline-block p-4 rounded my-1 break-words`}
        >
          {message.content}
        </div>
      )}
      {message.messageType === "file" && (
        <div
          className={`${
            message.sender !== selectedChatData._id
              ? "bg-[#8417ff]/5 text-[#ffff]/90 border-[#8417ff]/50"
              : "bg-[#2a2b33]/5 text-white/80 border-[#ffff]/20"
          } border inline-block p-4 rounded my-1 break-words`}
        >
          {checkIfImage(message.fileUrl) ? (
            <div
              className="cursor-pointer"
              onClick={() => setEnlargedImage(message.fileUrl)}
            >
              <img
                src={`${HOST}/${message.fileUrl}`}
                className="max-h-[300px] max-w-[300px] object-contain"
                alt="Message file"
              />
            </div>
          ) : (
            <div className="gap-5 items-center justify-center flex">
              <span className="text-white/80 p-3 text-3xl bg-black/20 rounded-full">
                <MdOutlineFolderZip />
              </span>
              <span>{message.fileUrl.split("/").pop()}</span>
              <span
                className="p-3 rounded-full text-2xl bg-black/20 hover:bg-black/50 cursor-pointer transition-all duration-300"
                onClick={() => downloadFile(message.fileUrl)}
              >
                <IoMdArrowRoundDown />
              </span>
            </div>
          )}
        </div>
      )}
      <div className="text-xs text-gray-600">
        {moment(message.timestamp).format("LT")}
      </div>
    </div>
  );

  
  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 w-full max-w-[90vw]">
      {renderMessages()}
      <div ref={scrollRef} />
      {enlargedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-[90vw] h-[90vh] flex flex-col items-center justify-center">
            <div className="absolute mt-4 top-4 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
              <button
                className="p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-300"
                onClick={() => downloadFile(enlargedImage)}
              >
                <IoMdArrowRoundDown size={24} />
              </button>
              <button
                className="p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-300"
                onClick={() => setEnlargedImage(null)}
              >
                <IoCloseSharp size={24} />
              </button>
            </div>
            <img
              src={`${HOST}/${enlargedImage}`}
              alt="Enlarged image"
              className="max-w-[90%] max-h-[90%] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageContainer;