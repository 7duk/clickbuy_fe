import Dropdowns from "./Dropdowns";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { NavLink } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";

const Sidenav: React.FC = () => {
  const { isAuth } = useContext(AppContext);

  return (
    <div className="text-white w-full h-full">
      <nav className="flex flex-row font-bold ">
        <ul className="list-none grid grid-flow-col w-3/4 justify-start">
          <li className="p-2 flex items-center me-4">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "hover:text-blue-500"
              }
            >
              Home
            </NavLink>
          </li>
          <li className="p-2 flex items-center me-4">
            <NavLink
              to="/product"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "hover:text-blue-500"
              }
            >
              Product
            </NavLink>
          </li>
          <li className="p-2 flex items-center me-4">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "hover:text-blue-500"
              }
            >
              About
            </NavLink>
          </li>
        </ul>

        <ul className="list-none grid grid-flow-col w-1/4 justify-end">
          {!isAuth ? (
            <>
              <li className="p-2 me-2">
                <NavLink
                  to="/signin"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "hover:text-blue-500"
                  }
                >
                  Sign In
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="p-2 flex items-center hover:text-blue-500 me-2">
                <NavLink
                  to="/favorites"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "hover:text-blue-500"
                  }
                >
                  <Heart />
                </NavLink>
              </li>
              <li className="p-2 flex items-center hover:text-blue-500 me-2">
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "hover:text-blue-500"
                  }
                >
                  <ShoppingCart />
                </NavLink>
              </li>
              <li className="p-2 flex items-center hover:text-blue-500 me-2">
                <Dropdowns />
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidenav;
