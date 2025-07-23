"use client";

import axiosConfig from "@/lib/axios/axiosInstance";
import { endpoints } from "@/lib/axios/endpoints";
import { useMutation } from "@tanstack/react-query";

const UserSignUpHandler = async (data: any) => {
  return await axiosConfig.post(endpoints.signUp, data);
};

const useSignUp = () => {
  return useMutation({
    mutationKey: ["signUp"],
    mutationFn: UserSignUpHandler,
    onSuccess: (data) => {
      console.log("Sign up successful:", data);
    },
    onError: (error) => {
      console.error("Sign up failed:", error);
    },
  });
};
export default useSignUp;
