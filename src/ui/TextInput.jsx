import React from "react";

const TextInput = ({
  type = "text",
  id = "",
  placeholder = "",
  name = "",
  tabIndex,
  className = "",
  required = false,
}) => {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      name={name}
      tabIndex={tabIndex}
      className={`px-5 py-2 border border-[#3E5C76] rounded-2xl outline-none w-full ${className}`}
      required={required}
    />
  );
};

export default TextInput;
