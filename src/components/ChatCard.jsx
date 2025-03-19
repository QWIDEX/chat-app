import React from "react";
import { useNavigate, useParams } from "react-router";

const ChatCard = ({ chatName = "", lastMessage = "", chatId = "" }) => {
  const param = useParams().chatId;

  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`chats/${chatId}`)}
      className={`bg-transparent text-start cursor-pointer flex items-start flex-col p-3 h-16 hover:bg-[#3E5C76] transition-all ${
        chatId === param ? "bg-[#3E5C76]!" : ""
      }`}
    >
      <h6>{chatName}</h6>
      <div className="text-xs opacity-80 block overflow-hidden text-ellipsis w-[calc(100% - 24px)]">
        {lastMessage === "" ? "Chat is empty" : lastMessage}
      </div>
    </button>
  );
};

export default ChatCard;
