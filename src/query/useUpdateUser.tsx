import { User } from "@/hooks/useBootUser";
import axiosConfig, { endpoints } from "@/lib";
import { useMutation } from "@tanstack/react-query";

const handleUpdateUserMutation = async (userData: User) => {
  const resp = await axiosConfig.patch(endpoints.updateUser, userData);
  return resp;
};

const useUpdateUserMutation = () => {
  return useMutation({
    mutationKey: ["updateUser"],
    mutationFn: handleUpdateUserMutation,
  });
};

export default useUpdateUserMutation;
