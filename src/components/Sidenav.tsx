import useAppContext from "../hooks/useAppContext";
import type { SidenavProps } from "../types/components/SidenavProps";

const Sidenav: React.FC<SidenavProps> = ({ isAuth }) => {
  const { setIsAuth } = useAppContext();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsAuth(false);
  };
  return (
    <div className="text-white w-full h-full">
      <nav className="flex flex-row">
        <ul className="list-none grid grid-flow-col w-3/4 justify-start">
          <li className="p-2  hover:text-gray-800 transition-transform duration-300 hover:scale-120 me-2">
            <a href="/home">Home</a>
          </li>
          <li className="p-2  hover:text-gray-800 transition-transform duration-300 hover:scale-120 me-2">
            <a href="/about">About</a>
          </li>
        </ul>

        <ul className="list-none grid grid-flow-col w-1/4 justify-end">
          {!isAuth ? (
            <>
              <li className="p-2 hover:text-gray-800 transition-transform duration-300 hover:scale-120 me-2">
                <a href="/signin">Sign In</a>
              </li>
            </>
          ) : (
            <li className="p-2 hover:text-gray-800 transition-transform duration-300 hover:scale-120 me-2">
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidenav;
