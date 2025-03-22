import React from "react";

const Message = ({ sentAt = "", sender = "", message = "", username = "" }) => {
  const sentDate = new Date(sentAt);

  const timeString = `${sentDate.getHours()}:${sentDate.getMinutes() < 10 ? "0" + sentDate.getMinutes() : sentDate.getMinutes()}`;

  return (
    <div
      className={`max-w-full sm:max-w-[80%] w-fit rounded-xl px-3 pr-12 py-1 relative bg-[#3e5c76] ${
        username === sender ? "justify-self-end" : ""
      }`}
    >
      {username === sender ? (
        <></>
      ) : (
        <h6 className="text-sm text-[#a7caf7]">{sender}</h6>
      )}
      <p className="text-sm w-full whitespace-pre-wrap break-words">
        {message}
      </p>
      <span className="absolute block right-2 bottom-1 text-xs text-[#748CAB]">
        {timeString}
      </span>
    </div>
  );
};

export default Message;
