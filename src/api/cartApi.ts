import type { ApiResponse, ItemCart } from "../helpers/data";
import axiosClient from "./axiosClient";

export const getCartItems = async (): Promise<ApiResponse<ItemCart[]>> => {
  const response = await axiosClient.get("/cart");
  return response.data;
};

export const remoteCartItem = async (
  id: number
): Promise<ApiResponse<null>> => {
  const response = await axiosClient.delete(`/cart/items/${id}`);
  return response.data;
};

export const addItemIncart = async (
  itemId: number,
  { quantity }: { quantity: number }
): Promise<ApiResponse<null>> => {
  const response = await axiosClient.put(`/cart/items/${itemId}`, {
    quantity,
  });
  return response.data;
};
