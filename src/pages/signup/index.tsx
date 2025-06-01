import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-xl font-bold p-3">Sign Up</h1>
        <form className="bg-white shadow-md px-8 w-[400px] h-[500px] flex flex-col justify-center items-center gap-3">
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
            />
          </div>
          <div className="mb-4 flex flex-row justify-between items-center w-full">
            <label
              className="block text-gray-700 text-sm font-bold"
              htmlFor="fullname"
            >
              Fullname
            </label>
            <input
              className="shadow appearance-none border border-gray-300 rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullname"
              type="text"
            />
          </div>
          <div className="mb-4 flex flex-row justify-between items-center w-full">
            <label
              className="block text-gray-700 text-sm font-bold"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border border-gray-300 rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
            />
          </div>
          <div className="flex flex-col items-center gap-4 w-full">
            <button
              className="bg-blue-400 text-white text-md p-2 rounded focus:outline-none focus:shadow-outline w-full"
              type="button"
            >
              Sign Up
            </button>
            <div className="flex flex-col gap-1 w-full items-center">
              <p className="font-normal text-sm">
                Already have an account ?
                <a
                  className="inline-block align-baseline pl-1 text-blue-500 hover:text-blue-800"
                  href="/signin"
                >
                  Sign In
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

export default SignUp;
