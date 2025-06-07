import { useEffect } from "react";
import useAppContext from "../../hooks/useAppContext";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { setIsLogin } = useAppContext();

  useEffect(() => {
    setIsLogin(false);
  }, [setIsLogin]);

  return (
    <div className="flex flex-col w-full h-full my-1/2 bg-slate-50">
      <div className="flex flex-col items-center">
        <h1 className="text-center flex p-4 pt-10 font-bold text-5xl text-blue-500 cursor-default">
          Welcome to our website!
        </h1>
        <div className="flex w-full justify-center p-4">
          <Link
            to="/product"
            className="bg-slate-50 border border-2 py-2 px-4 rounded-md text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-300"
          >
            Get Started
          </Link>
        </div>
        <div className="flex flex-row py-4 items-center justify-center w-full">
          <input
            type="text"
            placeholder="Enter search information..."
            className="w-2/3 h-12 focus:outline-none border-y-2 border-l-2 border-blue-300 rounded-l-md px-2"
          />
          <div className="w-18 h-12 bg-blue-300 flex items-center justify-center rounded-r-md hover:bg-blue-500 transition-colors duration-300 cursor-pointer">
            <Search className="text-white " />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-evenly py-10 gap-6 px-4 md:px-8">
          <div className="w-full md:w-1/3 lg:w-1/4 h-auto min-h-[120px] bg-blue-100 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-start p-5 border-2 border-blue-200 mb-4 md:mb-0 cursor-default">
            <h2 className="font-bold text-xl py-3 text-blue-500">
              High Quality
            </h2>
            <p className="text-center text-gray-700">
              Products from many leading manufacturers
            </p>
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4 h-auto min-h-[120px] bg-blue-100 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-start p-5 border-2 border-blue-200 mb-4 md:mb-0 cursor-default">
            <h2 className="font-bold text-xl py-3 text-blue-500">
              Dedicated Consultation
            </h2>
            <p className="text-center text-gray-700">
              Our team is extensively trained, always ready to support and
              provide thorough advice
            </p>
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4 h-auto min-h-[120px] bg-blue-100 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-start p-5 border-2 border-blue-200 cursor-default">
            <h2 className="font-bold text-xl py-3 text-blue-500">
              Great Support
            </h2>
            <p className="text-center text-gray-700">
              Flexible return policy and official warranty
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
