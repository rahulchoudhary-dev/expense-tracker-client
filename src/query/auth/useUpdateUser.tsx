import axiosConfig from "@/lib/axios/axiosInstance";
import { endpoints } from "@/lib/axios/endpoints";
import { useMutation } from "@tanstack/react-query";

const handleUpdateUserMutation = async (userData: any) => {
  const resp = await axiosConfig.patch(endpoints.updateUser, userData);
  return resp.data;
};

const useUpdateUserMutation = () => {
  return useMutation({
    mutationKey: ["updateUser"],
    mutationFn: handleUpdateUserMutation,
  });
};

export default useUpdateUserMutation;
