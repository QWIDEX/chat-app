import React from "react";

const SubmitBtn = ({
  onClick = () => {},
  className = "",
  children,
  tabIndex,
}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`bg-[#238636] hover:bg-[#29903b] transition-all px-10 py-2 rounded-2xl cursor-pointer ${className}`}
      tabIndex={tabIndex}
    >
      {children}
    </button>
  );
};

export default SubmitBtn;
