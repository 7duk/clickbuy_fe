import type { ApiResponse } from "../helpers/data";
import axiosClient from "./axiosClient";

export interface AccountResponse {
  id: string;
  username: string;
  fullname: string;
  email: string;
  created_at: string;
}

export const getAccountInfo = async (
  id: string
): Promise<ApiResponse<AccountResponse>> => {
  const response = await axiosClient.get(`/account/info/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  return response.data;
};
