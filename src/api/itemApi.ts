import type { ApiResponse } from "../helpers/data";
import axiosClient from "./axiosClient";
export interface Image {
  image_id: number;
  image_link: string;
}
export interface Item {
  id: number;
  item_name: string;
  description?: string;
  public_price: number;
  discount: number;
  amount: number;
  rating: number;
  images: Image[];
}
export interface ItemPageable<T> {
  content: T[];
  page: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
}

export interface ItemRequest {
  page: number;
  size: number;
  sort?: string;
  direction?: "asc" | "desc";
  category_ids?: string;
}

export const getItems = async (
  itemRequest: ItemRequest
): Promise<ApiResponse<ItemPageable<Item>>> => {
  const { page = 1, size = 10, sort, direction, category_ids } = itemRequest;
  console.log("category_ids", category_ids);
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    ...(sort && { sort }),
    ...(direction && { direction }),
    ...(category_ids !== undefined && {
      category_ids: category_ids.toString(),
    }),
  });
  const response = await axiosClient.get(`/item?${params.toString()}`);
  return response.data;
};

export const getItemById = async (id: number): Promise<ApiResponse<Item>> => {
  const response = await axiosClient.get(`/item/${id}`);
  return response.data;
};
