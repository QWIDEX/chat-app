import React from "react";
import { useParams } from "react-router";

const ChatCard = ({ chatName = "", lastMessage = "", chatId = "", onClick = () => {} }) => {
  const param = useParams().chatId;

  return (
    <button
      onClick={onClick}
      className={`bg-transparent text-start cursor-pointer flex items-start flex-col p-3 h-16 hover:bg-[#3E5C76] transition-all ${
        chatId === param ? "bg-[#3E5C76]!" : ""
      }`}
    >
      <h6 className="block overflow-hidden text-ellipsis w-[95%]">{chatName}</h6>
      <div className="text-xs opacity-80 block overflow-hidden text-ellipsis w-[95%]">
        {lastMessage === "" ? "Chat is empty" : lastMessage}
      </div>
    </button>
  );
};

export default ChatCard;
