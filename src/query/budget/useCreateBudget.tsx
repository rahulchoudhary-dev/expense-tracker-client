import axiosConfig from "@/lib/axios/axiosInstance";
import { endpoints } from "@/lib/axios/endpoints";
import { useMutation } from "@tanstack/react-query";

const handlerCreateBudget = async (data: any) => {
  const result = await axiosConfig.post(endpoints.createBudget, data);
  return result;
};

const useCreateBudgetMutation = () => {
  return useMutation({
    mutationKey: ["create-budget"],
    mutationFn: handlerCreateBudget,
  });
};

export default useCreateBudgetMutation;
