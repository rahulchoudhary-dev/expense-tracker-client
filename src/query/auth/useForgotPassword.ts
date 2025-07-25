import axiosConfig from "@/lib/axios/axiosInstance";
import { endpoints } from "@/lib/axios/endpoints";
import { useMutation } from "@tanstack/react-query";

const handleForgotPassword = async (values: any) => {
  const result = await axiosConfig.post(endpoints.forgotPassword, values);
  return result;
};

const useForgotPassword = () => {
  return useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: handleForgotPassword,
  });
};

export default useForgotPassword;
