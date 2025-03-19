import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import useInitUser from "../hooks/useInitUser";

const Layout = () => {
  useInitUser();

  return (
    <div className="bg-[#01161e] w-[100%] h-[100dvh] flex text-[#eeedea] font-sans">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Layout;
