import React from "react";
import ChatCard from "./ChatCard";
import useChats from "../hooks/useChats";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import ChatCardSkeleton from "./ChatCardSkeleton";

const ChatList = () => {
  const { chats, error, loading } = useChats();
  const navigate = useNavigate();

  if (error && error.status !== 401) {
    toast.error("Something went wrong while loading chats");
  }

  if (loading) {
    return (
      <div className="w-[100%] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full[&::-webkit-scrollbar-track]:bg-[#2e343c] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#565b60] grid max-h-[100%] overflow-auto">
        {Array.from({ length: 10 }, () => {}).map((_, idx) => {
          return <ChatCardSkeleton key={idx} />;
        })}
      </div>
    );
  }

  return (
    <div className="w-[100%] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full[&::-webkit-scrollbar-track]:bg-[#2e343c] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#565b60] grid max-h-[100%] overflow-auto">
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
