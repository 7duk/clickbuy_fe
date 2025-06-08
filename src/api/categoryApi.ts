import type { ApiResponse } from "../helpers/data";
import axiosClient from "./axiosClient";

export interface CategoryResponse {
  category_id: number;
  category_name: string;
}

export const getCategories = async (): Promise<
  ApiResponse<CategoryResponse[]>
> => {
  const response = await axiosClient.get(`/category`);
  return response.data;
};
