import React from "react";
import userIcon from "../icons/user-circle-svgrepo-com.svg";
import { useSelector } from "react-redux";

const UserDisplay = () => {
  const user = useSelector((state) => state.userSlice.User.user);
  return (
    <div className="flex px-3 h-14 items-center gap-3">
      <img src={userIcon} className="w-7 h-7" alt="avatar" />
      <div className="flex w-[80%] flex-col">
        <h6 className="text-lg">{user?.username}</h6>
        <div className="text-xs opacity-80 block overflow-hidden text-ellipsis w-[100%]">
          {user?.email}
        </div>
      </div>
    </div>
  );
};

export default UserDisplay;
