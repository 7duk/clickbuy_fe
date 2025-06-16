import { useMutation } from "@tanstack/react-query";
import {
  login,
  logout,
  type LoginRequest,
  type LoginResponse,
} from "../api/authApi";
import type { ApiResponse } from "../helpers/data";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAppContext from "./useAppContext";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setIsAuth } = useAppContext();
  return useMutation<ApiResponse<LoginResponse>, Error, LoginRequest>({
    mutationFn: login,
    onError: (error) => {
      const apiError = error as AxiosError<ApiResponse<LoginResponse>>;
      console.log("Login error:", apiError);
      if (apiError.response) {
        const errorMessage = apiError.response.data.message;
        toast.error(errorMessage || "login failed");
      } else {
        toast.error("Network error:" + apiError.message);
      }
    },
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.data?.access_token || "");
      localStorage.setItem("user_id", data.data?.id || "");
      setIsAuth(true);
      navigate("/home", { replace: true });
    },
  });
};

export const useLogout = () => {
  return useMutation<ApiResponse<null>, Error>({
    mutationKey: ["logout"],
    mutationFn: logout,
  });
};
