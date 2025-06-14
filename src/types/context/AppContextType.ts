import type { Dispatch, SetStateAction } from "react";
import type { ItemCart } from "../../helpers/data";

export interface AppContextType {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  cartItems: ItemCart[];
  setCartItems: Dispatch<SetStateAction<ItemCart[]>>;
  currentItemsInCart: number;
  setCurrentItemsInCart: Dispatch<SetStateAction<number>>;
}
