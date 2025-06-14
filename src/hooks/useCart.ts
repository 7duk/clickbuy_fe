import { useMutation } from "@tanstack/react-query";
import { addItemIncart, getCartItems, remoteCartItem } from "../api/cartApi";
import useAppContext from "./useAppContext";

export const useGetCartItems = () => {
  const { setCartItems } = useAppContext();
  return useMutation({
    mutationFn: async () => await getCartItems(),
    onSuccess: (data) => {
      setCartItems(data.data || []);
    },
  });
};

export const useRemoveCartItem = () => {
  return useMutation({
    mutationFn: async (id: number) => await remoteCartItem(id),
  });
};

export const useAddItemInCart = () => {
  return useMutation({
    mutationFn: async ({
      itemId,
      quantity,
    }: {
      itemId: number;
      quantity: number;
    }) => {
      return await addItemIncart(itemId, { quantity });
    },
  });
};
