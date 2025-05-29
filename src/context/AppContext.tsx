import { createContext, useState } from "react";
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
  return (
    <AppContext.Provider value={{ isAuth, setIsAuth, isLogin, setIsLogin }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
