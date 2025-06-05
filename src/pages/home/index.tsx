import { useEffect } from "react";
import useAppContext from "../../hooks/useAppContext";

const HomePage = () => {
  const { setIsLogin } = useAppContext();

  useEffect(() => {
    setIsLogin(false);
  }, [setIsLogin]);

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
    </div>
  );
};
export default HomePage;
