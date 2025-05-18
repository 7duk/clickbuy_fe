import React from "react";
import Sidenav from "./Sidenav";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="!bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold w-[200px]">
          <Link to={"/home"}>My App</Link>
        </div>
        <Sidenav isAuth={false} isLogin={true} />
      </div>
    </header>
  );
};

export default Header;
