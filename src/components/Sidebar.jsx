import React, { useState } from "react";
import UserDisplay from "./UserDisplay";
import ChatList from "./ChatList";
import UsersList from "./UsersList";

const Sidebar = () => {
  const [selectedList, setSelectedList] = useState("chats");

  return (
    <div className="sm:w-[20%] shadow-lg shadow-black relative w-0 max-w-96 sm:min-w-56 bg-[#1D2D44] h-[100dvh] flex flex-col overflow-hidden">
      <div className="bg-[#3E5C76] ">
        <UserDisplay />
        <div className="h-10 w-full flex justify-around items-end">
          <button
            type="button"
            className={`relative px-5 py-1.5 rounded-tl-2xl rounded-tr-2xl after:rounded-bl-[300px] after:-right-2.5 after:content-[""] after:absolute after:w-2.5 after:h-2.5 after:bg-[#3E5C76] after:bottom-0 before:content-[""] before:absolute before:w-2.5 before:h-2.5 before:bg-[#3E5C76] before:bottom-0  before:rounded-br-[300px] before:-left-2.5 cursor-pointer ${
              selectedList == "chats"
                ? "bg-[#1D2D44] before:shadow-[3px_3px_0px_3px_#1D2D44] after:shadow-[-3px_3px_0px_3px_#1D2D44]"
                : ""
            }`}
            onClick={() => setSelectedList("chats")}
          >
            Chats
          </button>
          <button
            type="button"
            className={`relative px-5 py-1.5 rounded-tl-2xl rounded-tr-2xl after:rounded-bl-[300px] after:-right-2.5 after:content-[""] after:absolute after:w-2.5 after:h-2.5 after:bg-[#3E5C76] after:bottom-0 before:content-[""] before:absolute before:w-2.5 before:h-2.5 before:bg-[#3E5C76] before:bottom-0  before:rounded-br-[300px] before:-left-2.5 cursor-pointer ${
              selectedList == "users"
                ? "bg-[#1D2D44] before:shadow-[3px_3px_0px_3px_#1D2D44] after:shadow-[-3px_3px_0px_3px_#1D2D44]"
                : ""
            }`}
            onClick={() => setSelectedList("users")}
          >
            Users
          </button>
        </div>
      </div>
      <div className="relative mt-1 h-[calc(100%-96px)]">{selectedList == "chats" ? <ChatList /> : <UsersList />}</div>
    </div>
  );
};

export default Sidebar;
