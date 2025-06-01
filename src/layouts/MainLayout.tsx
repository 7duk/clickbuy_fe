import Footer from "../components/Footer";
import Header from "../components/Header";
import React from "react";
import { Outlet } from "react-router-dom";
import type { SidenavProps } from "../types/components/SidenavProps";

const MainLayout: React.FC<SidenavProps> = ({ isAuth }) => {
  return (
    <div className="min-h-screen bg-white relative flex flex-col">
      <Header isAuth={isAuth} />
      <main className="flex-1 flex items-center justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
