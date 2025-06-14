import Dropdowns from "./Dropdowns";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import useAppContext from "../hooks/useAppContext";

const Sidenav: React.FC = () => {
  const { isAuth } = useContext(AppContext);
  const { currentItemsInCart } = useAppContext();

  

  return (
    <div className="text-white w-full h-full">
      <nav className="flex flex-row font-bold ">
        <ul
          className={`list-none grid grid-flow-col w-3/4 justify-start ${
            isAuth ? "visible" : "invisible"
          }`}
        >
          <li className="p-2 flex items-center me-4">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-500 border-b-2 border-yellow-500"
                  : "hover:text-yellow-500"
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
                  ? "text-yellow-500 border-b-2 border-yellow-500"
                  : "hover:text-yellow-500"
              }
            >
              Product
            </NavLink>
          </li>
          <li className="p-2 flex items-center me-4">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-500 border-b-2 border-yellow-500"
                  : "hover:text-yellow-500"
              }
            >
              Contact
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
                      ? "text-yellow-500 border-b-2 border-yellow-500"
                      : "hover:text-yellow-500"
                  }
                >
                  Sign In
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="p-2 flex items-center hover:text-yellow-500 relative">
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-500 border-b-2 border-yellow-500"
                      : "hover:text-yellow-500"
                  }
                >
                  <ShoppingCart />
                  <p className="absolute top-0 left-[17px] text-yellow-500 text-xs">
                    {currentItemsInCart}
                  </p>
                </NavLink>
              </li>
              <li className="p-2 flex items-center hover:text-yellow-500 me-2">
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
