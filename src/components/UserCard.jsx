import React from "react";
import userIcon from "../icons/user-circle-svgrepo-com.svg";
const UserCard = ({ username, email, uid, createChat = () => {} }) => {

  return (
    <div className="flex px-3 h-14 items-center">
      <img src={userIcon} className="w-7 h-7 mr-3" alt="avatar" />
      <div className="flex w-[60%] flex-col">
        <h6 className="text-lg block overflow-hidden text-ellipsis w-[100%]">
          {username}
        </h6>
        <div className="text-xs opacity-80 block overflow-hidden text-ellipsis w-[100%]">
          {email}
        </div>
      </div>
      <button onClick={() => createChat(uid)} className="cursor-pointer justify-self-end ml-auto text-2xl p-2">
        +
      </button>
    </div>
  );
};

export default UserCard;
