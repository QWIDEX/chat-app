import React from "react";
import ChatCard from "./ChatCard";
import useChats from "../hooks/useChats";
import LoadingIndicator from "./LoadingIndicator";
import ErrorIndicator from "./ErrorIndicator";
import { useNavigate } from "react-router";

const ChatList = () => {
  const { chats, error, loading } = useChats();

  const navigate = useNavigate();

  return (
    <div className="w-[100%] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full[&::-webkit-scrollbar-track]:bg-[#2e343c] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#565b60] grid max-h-[100%] overflow-auto">
      {loading || error ? (
        <div className="w-full flex justify-center items-center">
          {loading ? (
            <LoadingIndicator />
          ) : error.status === 401 && error ? (
            <></>
          ) : (
            <ErrorIndicator />
          )}
        </div>
      ) : (
        <></>
      )}
      {chats?.map((chat) => (
        <ChatCard
          onClick={() => navigate(`chats/${chat.chatId}`)}
          lastMessage={chat.chat[0]?.message}
          chatName={chat.chatName}
          key={chat.chatId}
          chatId={chat.chatId}
        />
      ))}
    </div>
  );
};

export default ChatList;
