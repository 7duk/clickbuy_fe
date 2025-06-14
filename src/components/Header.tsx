import React from "react";
import Sidenav from "./Sidenav";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 flex bg-red-600 text-white p-4 z-40">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold w-[200px]">
          <Link to={"/home"}>
            <img
              src="/startup-rocket-svgrepo-com.svg"
              alt="Projects"
              className="h-8 w-8"
            />
          </Link>
        </div>
        <Sidenav />
      </div>
    </header>
  );
};

export default Header;
