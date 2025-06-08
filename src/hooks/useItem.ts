import { useQuery } from "@tanstack/react-query";
import { getItemById, getItems, type ItemRequest } from "../api/itemApi";

export const useGetItems = (itemRequest: ItemRequest) => {
  return useQuery({
    queryKey: ["items", itemRequest],
    queryFn: async () => await getItems(itemRequest),
  });
};

export const useGetItem = (id: number) => {
  return useQuery({
    queryKey: ["item", id],
    queryFn: async () => await getItemById(id),
  });
};
