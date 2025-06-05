import { useMutation } from "@tanstack/react-query";
import { getAccountInfo, type AccountResponse } from "../api/accountApi";
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
