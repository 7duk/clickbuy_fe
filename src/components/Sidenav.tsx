import Dropdowns from "./Dropdowns";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const Sidenav: React.FC = () => {
  const { isAuth } = useContext(AppContext);

  return (
    <div className="text-white w-full h-full">
      <nav className="flex flex-row">
        <ul className="list-none grid grid-flow-col w-3/4 justify-start">
          <li className="p-2 flex items-center hover:text-gray-800 me-2">
            <Link to="/home">Home</Link>
          </li>
          <li className="p-2 flex items-center hover:text-gray-800 me-2">
            <Link to="/about">About</Link>
          </li>
        </ul>

        <ul className="list-none grid grid-flow-col w-1/4 justify-end">
          {!isAuth ? (
            <>
              <li className="p-2 hover:text-gray-800 me-2">
                <Link to="/signin">Sign In</Link>
              </li>
            </>
          ) : (
            <li className="p-2 flex items-center hover:text-gray-800 me-2">
              <Dropdowns />
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidenav;
