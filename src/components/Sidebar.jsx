import React, { useState } from "react";
import UserDisplay from "./UserDisplay";
import ChatList from "./ChatList";
import UsersList from "./UsersList";

const Sidebar = () => {
  const [selectedList, setSelectedList] = useState("chats");

  return (
    <div className="sm:w-[20%] w-0 max-w-96 sm:min-w-52 bg-[#1D2D44] h-[100dvh] flex flex-col overflow-hidden sm:p-2 md:p-3 xl:p-5">
      <UserDisplay />
      <div className="h-14 w-full flex justify-around items-center">
        <button
          type="button"
          className={`border border-[#748CAB] px-5 py-1.5 rounded-2xl hover:bg-[#748CAB] transition-all cursor-pointer ${
            selectedList == "chats" ? "bg-[#748CAB]" : ""
          }`}
          onClick={() => setSelectedList("chats")}
        >
          Chats
        </button>
        <button
          type="button"
          className={`border border-[#748CAB] px-5 py-1.5 rounded-2xl hover:bg-[#748CAB] transition-all cursor-pointer ${
            selectedList == "users" ? "bg-[#748CAB]" : ""
          }`}
          onClick={() => setSelectedList("users")}
        >
          Users
        </button>
      </div>
      {selectedList == "chats" ? <ChatList /> : <UsersList />}
    </div>
  );
};

export default Sidebar;
