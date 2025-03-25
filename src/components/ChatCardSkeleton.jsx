import React from "react";

const ChatCardSkeleton = () => {
  return (
    <div className="text-start cursor-pointer grid gap-2 p-3 h-16">
      <div className="w-[30%] h-3.5 animate-pulse bg-[#eeedea] block rounded-full"></div>
      <div className="w-[80%] h-3 animate-pulse bg-[#eeedea] block rounded-full"></div>
    </div>
  );
};

export default ChatCardSkeleton;
