import { useMutation } from "@tanstack/react-query";
import {
  changePassword,
  getAccountInfo,
  updateAccountInfo,
  type AccountResponse,
} from "../api/accountApi";
import type { AxiosError } from "axios";
import type { ApiResponse } from "../helpers/data";
import { toast } from "react-toastify";

export const useAccountInfo = () => {
  return useMutation({
    mutationKey: ["accountInfo"],
    mutationFn: async (id: string) => getAccountInfo(id),
    onError: (error) => {
      const apiError = error as AxiosError<ApiResponse<AccountResponse>>;
      if (apiError.response) {
        const errorMessage = apiError.response.data.message;
        toast.error(errorMessage || "login failed");
      } else {
        toast.error("Network error:" + apiError.message);
      }
    },
  });
};

export const useUpdateUserInfo = () => {
  return useMutation({
    mutationKey: ["updateUserInfo"],
    mutationFn: async ({ id, fullname }: { id: number; fullname: string }) => {
      return await updateAccountInfo(id, fullname);
    },
    onError: (error) => {
      const apiError = error as AxiosError<ApiResponse<null>>;
      if (apiError.response) {
        const errorMessage = apiError.response.data.message;
        toast.error(errorMessage || "Update failed");
      } else {
        toast.error("Network error:" + apiError.message);
      }
    },
    onSuccess: () => {
      toast.success("User information updated successfully");
    },
  });
};
export const useChangePassword = () => {
  return useMutation({
    mutationKey: ["changePassword"],
    mutationFn: async ({
      id,
      oldPassword,
      newPassword,
    }: {
      id: number;
      oldPassword: string;
      newPassword: string;
    }) => {
      return await changePassword(id, oldPassword, newPassword);
    },
    onError: (error) => {
      const apiError = error as AxiosError<ApiResponse<null>>;
      if (apiError.response) {
        const errorMessage = apiError.response.data.message;
        toast.error(errorMessage || "Change password failed");
      } else {
        toast.error("Network error:" + apiError.message);
      }
    },
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
  });
};
