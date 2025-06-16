import type { ApiResponse } from "../helpers/data";
import axiosClient from "./axiosClient";

export interface LoginRequest {
  username: string;
  password: string;
}
export interface LoginResponse {
  id: string;
  username: string;
  fullname: string;
  email: string;
  created_at: string;
  access_token: string;
  refresh_token: string;
}

export const login = async (
  data: LoginRequest
): Promise<ApiResponse<LoginResponse>> => {
  const response = await axiosClient.post<ApiResponse<LoginResponse>>(
    "/auth/login",
    data,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const logout = async (): Promise<ApiResponse<null>> => {
  const response = await axiosClient.post<ApiResponse<null>>(
    "/auth/logout",
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const refreshToken = async (
  accessToken: string
): Promise<ApiResponse<LoginResponse>> => {
  const response = await axiosClient.post<ApiResponse<LoginResponse>>(
    `/auth/refresh-token`,
    {
      access_token: accessToken,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};
