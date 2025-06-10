import type { ApiResponse } from "../helpers/data";
import axiosClient from "./axiosClient";

export interface Review {
  id: string;
  item_id: number;
  rating: number;
  content: string;
  fullname: string;
  last_modified_by: number;
  last_modified_at: string;
}

export const getReviews = async (
  itemId: number
): Promise<ApiResponse<Review[]>> => {
  const response = await axiosClient.get(`/items/${itemId}/reviews`);
  return response.data;
};
