import Footer from "../components/Footer";
import Header from "../components/Header";
import React from "react";
import type { MainLayoutProps } from "../types/layouts/MainLayoutProps";

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  isAuth,
  isLogin,
}) => {
  return (
    <div className="min-h-screen bg-white relative flex flex-col">
      <Header isAuth={isAuth} isLogin={isLogin} />
      <main className="flex-1 flex items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
