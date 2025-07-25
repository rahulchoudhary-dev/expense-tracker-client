import axiosConfig from "@/lib/axios/axiosInstance";
import { endpoints } from "@/lib/axios/endpoints";
import { useMutation } from "@tanstack/react-query";

const handleResetPassword = async (values: any) => {
  const result = await axiosConfig.post(endpoints.resetPassword, values);
  return result;
};

const useResetPassword = () => {
  return useMutation({
    mutationKey: ["reset-password"],
    mutationFn: handleResetPassword,
  });
};

export default useResetPassword;
