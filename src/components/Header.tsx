import React from "react";
import Sidenav from "./Sidenav";
import { Link } from "react-router-dom";
import type { SidenavProps } from "../types/components/SidenavProps";

const Header: React.FC<SidenavProps> = ({ isAuth }) => {
  return (
    <header className="sticky top-0flex bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold w-[200px]">
          <Link to={"/"}>App</Link>
        </div>
        <Sidenav isAuth={isAuth} />
      </div>
    </header>
  );
};

export default Header;
