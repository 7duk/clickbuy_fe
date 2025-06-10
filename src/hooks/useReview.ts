import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../api/reviewApi";

export const useGetReviews = (itemId: number) => {
  return useQuery({
    queryKey: ["reviews", itemId],
    queryFn: async () => await getReviews(itemId),
  });
}