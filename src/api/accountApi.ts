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


export const updateAccountInfo = async (id: number, fullname: string): Promise<ApiResponse<null>> => {
  const response = await axiosClient.put(`/account/${id}/edit-profile`, {fullname: fullname});
  return response.data;
}

export const changePassword= async (id: number, oldPassword: string, newPassword: string): Promise<ApiResponse<null>> => {
  const response = await axiosClient.put(`/account/${id}/change-password`, {
    old_password: oldPassword,
    new_password: newPassword,
  });
  return response.data;
}