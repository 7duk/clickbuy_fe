import Footer from "../components/Footer";
import Header from "../components/Header";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="p-4">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
