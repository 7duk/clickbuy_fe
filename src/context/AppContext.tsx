import { createContext, useMemo, useState, useEffect } from "react";
import type { AppContextType } from "../types/context/AppContextType";
import type { ItemCart } from "../helpers/data";
import { useGetCartItems } from "../hooks/useCart";

const AppContext = createContext<AppContextType>({
  isAuth: false,
  setIsAuth: () => {},
  isLogin: false,
  setIsLogin: () => {},
  cartItems: [],
  setCartItems: () => {},
  currentItemsInCart: 0,
  setCurrentItemsInCart: () => {},
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [cartItems, setCartItems] = useState<ItemCart[]>([]);
  const [currentItemsInCart, setCurrentItemsInCart] = useState(
    cartItems.reduce((total, item) => total + item.quantity, 0)
  );

  useEffect(() => {
    setCurrentItemsInCart(
      cartItems.reduce((total, item) => total + item.quantity, 0)
    );
  }, [cartItems]);

  // Load cart items when user is authenticated
  const { mutate: fetchCartItems } = useGetCartItems();
  
  useEffect(() => {
    if (isAuth) {
      fetchCartItems();
    }
  }, [isAuth, fetchCartItems]);

  const contextValue = useMemo(
    () => ({
      isAuth,
      setIsAuth,
      isLogin,
      setIsLogin,
      cartItems,
      setCartItems,
      currentItemsInCart,
      setCurrentItemsInCart,
    }),
    [isAuth, isLogin, cartItems, currentItemsInCart]
  );
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export { AppProvider, AppContext };
