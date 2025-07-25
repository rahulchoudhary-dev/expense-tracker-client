import axiosConfig from "@/lib/axios/axiosInstance";
import { endpoints } from "@/lib/axios/endpoints";
import { useMutation } from "@tanstack/react-query";

const handleVerifyOTP = async (values: any) => {
  const result = await axiosConfig.post(endpoints.verifyOTP, values);
  return result;
};

const useVerifyOTP = () => {
  return useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: handleVerifyOTP,
  });
};

export default useVerifyOTP;
