import { createContext, useMemo, useState } from "react";
import type { AppContextType } from "../types/context/AppContextType";

const AppContext = createContext<AppContextType>({
  isAuth: false,
  setIsAuth: () => {},
  isLogin: false,
  setIsLogin: () => {},
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const contextValue = useMemo(
    () => ({
      isAuth,
      setIsAuth,
      isLogin,
      setIsLogin,
    }),
    [isAuth, setIsLogin]
  );
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export { AppProvider, AppContext };
