import { Link } from "react-router-dom";
import { useEffect } from "react";
import useAppContext from "../../hooks/useAppContext";

const SignIn = () => {
  const { setIsLogin } = useAppContext();

  useEffect(() => {
    setIsLogin(true);
  }, [setIsLogin]);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold p-3">Sign In</h1>
      <form className="bg-white shadow-md px-8 pt-6 pb-8 w-[400px] h-[300px] flex flex-col justify-center items-center gap-3">
        <div className="mb-4 flex flex-row justify-center items-center gap-3">
          <label
            className="block text-gray-700 text-sm font-bold"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
          />
        </div>
        <div className="mb-4 flex flex-row justify-center items-center gap-3">
          <label
            className="block text-gray-700 text-sm font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
          />
        </div>
        <div className="flex flex-col items-center justify-between gap-3">
          <button
            className="bg-blue-400 text-white text-md py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-normal text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
        <div className="mt-2">
          <Link
            to={"/"}
            className="flex items-center justify-center w-[200px] h-[30px] border rounded-sm gap-2"
          >
            <img
              src={"src/assets/icons8-google-96.png"}
              alt="google"
              className="w-5 h-5"
            />
            Continue with Google
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
