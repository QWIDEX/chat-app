import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import useInitUser from "../hooks/useInitUser";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  useInitUser();

  return (
    <div className="bg-[#01161e] w-[100%] h-[100dvh] flex text-[#eeedea] font-sans">
      <Sidebar />
      <Outlet />
      <Toaster
        toastOptions={{ style: { background: "#1d2d44", color: "#eeedea" } }}
      />
    </div>
  );
};

export default Layout;
