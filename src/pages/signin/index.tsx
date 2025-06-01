import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import type { LoginRequest } from "../../api/authApi";
import { Spinner } from "../../components/Spiner";

const SignIn = () => {
  const { mutate, isPending } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(isPending);

  useEffect(() => {
    if (isPending) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isPending]);

  const handleLogin = () => {
    mutate({ username: username, password: password } as LoginRequest);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-xl font-bold p-3">Sign In</h1>
        {isLoading && <Spinner />}
        <form className="bg-white shadow-md px-8 w-[400px] h-[400px] flex flex-col justify-center items-center gap-3">
          <div className="mb-4 flex flex-row justify-between items-center w-full">
            <label
              className="block text-gray-700 text-sm font-bold"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border border-gray-300 rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4 flex flex-row justify-between items-center w-full">
            <label
              className="block text-gray-700 text-sm font-bold"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-gray-300 rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center gap-4 w-full">
            <button
              className="bg-blue-400 text-white text-md p-2 rounded focus:outline-none focus:shadow-outline w-full"
              type="button"
              onClick={handleLogin}
            >
              Sign In
            </button>
            <div className="flex flex-col gap-1 w-full items-center">
              <p className="font-normal text-sm">
                Don't have an account ?
                <a
                  className="inline-block align-baseline pl-1 text-blue-500 hover:text-blue-800"
                  href="/signup"
                >
                  Sign Up
                </a>
              </p>

              <a
                className="inline-block align-baseline font-normal text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot password ?
              </a>
            </div>
          </div>
          <div className="mt-2">
            <Link
              to={"/"}
              className="flex items-center justify-center w-[200px] h-[30px] border border-slate-200 rounded-sm gap-2"
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
    </div>
  );
};

export default SignIn;
