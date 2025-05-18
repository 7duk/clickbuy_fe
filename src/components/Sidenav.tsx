import type { SidenavProps } from "../types/components/SidenavProps";

const Sidenav: React.FC<SidenavProps> = ({ isAuth, isLogin }) => {
  return (
    <div className="bg-gray-800 text-white w-full h-full">
      <nav className="flex flex-row">
        <ul className="list-none grid grid-flow-col w-3/4 justify-start">
          {!isLogin ? (
            <>
              <li className="p-2 hover:bg-red-700 me-2">
                <a href="">Home</a>
              </li>
              <li className="p-2 hover:bg-red-700 me-2">
                <a href="">Contact</a>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>

        <ul className="list-none grid grid-flow-col w-1/4 justify-end">
          {!isAuth ? (
            <>
              <li className="p-2 hover:bg-red-700 me-2">
                <a href="/signin">Sign In</a>
              </li>
              <li className="p-2 hover:bg-red-700 me-2">
                <a href="">Sign Up</a>
              </li>
            </>
          ) : (
            <li className="p-2 hover:bg-red-700 me-2">
              <a href="">Logout</a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidenav;
