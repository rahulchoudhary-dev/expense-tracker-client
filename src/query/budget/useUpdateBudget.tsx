import axiosConfig from "@/lib/axios/axiosInstance";
import { endpoints } from "@/lib/axios/endpoints";
import { useMutation } from "@tanstack/react-query";

const handleUpdateBudget = async (data: any) => {
  const result = await axiosConfig.patch(endpoints.updateBudget, data);
  return result.data;
};

const useUpdateBudgetMutation = () => {
  return useMutation({
    mutationKey: ["update-budget"],
    mutationFn: handleUpdateBudget,
  });
};

export default useUpdateBudgetMutation;
