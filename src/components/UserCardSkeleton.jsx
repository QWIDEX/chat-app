import React from "react";

const UserCardSkeleton = () => {
  return (
    <div className="flex px-3 h-14 items-center">
      <div className="animate-pulse bg-[#eeedea] w-7 mr-3 h-7 rounded-full"></div>
      <div className="flex w-[80%] gap-1 flex-col">
        <div className="animate-pulse bg-[#eeedea] w-[30%] h-4.5 rounded-full"></div>
        <div className="animate-pulse bg-[#eeedea] w-[90%] h-3.5 rounded-full"></div>
      </div>
    </div>
  );
};

export default UserCardSkeleton;
