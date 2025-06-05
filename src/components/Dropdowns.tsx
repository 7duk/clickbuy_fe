import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { CircleUser } from "lucide-react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useAuth";
import { toast } from "react-toastify";
import useAppContext from "../hooks/useAppContext";

export default function Dropdowns() {
  const { setIsAuth } = useAppContext();
  const userID = localStorage.getItem("user_id");
  const { mutate } = useLogout();
  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: (response) => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_id");
        toast.success(response.message || "Logout successful");
        setIsAuth(false);
      },
    });
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="items-center flex">
        <MenuButton className="inline-flex justify-center">
          <CircleUser />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 w-56 mt-1 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <Link
              to={`/info/${userID}`}
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Account settings
            </Link>
          </MenuItem>
          <MenuItem>
            <button
              type="button"
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
            >
              Sign out
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
