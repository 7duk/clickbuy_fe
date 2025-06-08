import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/categoryApi";

export const useGetCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
