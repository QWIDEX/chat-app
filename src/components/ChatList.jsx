import React from "react";
import ChatCard from "./ChatCard";
import useChats from "../hooks/useChats";
import LoadingIndicator from "./LoadingIndicator";
import ErrorIndicator from "./ErrorIndicator";

const ChatList = () => {
  const { chats, error, loading } = useChats();

  return (
    <div className="w-[100%] flex flex-col">
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
