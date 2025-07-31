import axiosConfig from "@/lib/axios/axiosInstance";
import { endpoints } from "@/lib/axios/endpoints";
import { useMutation } from "@tanstack/react-query";

const createSupportRequest = async (data: any) => {
  const response = await axiosConfig.post(endpoints.createSupportRequest, data);
  return response.data;
};

const useCreateSupportRequest = () => {
  return useMutation({
    mutationKey: ["create-support-request"],
    mutationFn: createSupportRequest,
  });
};

export default useCreateSupportRequest;
