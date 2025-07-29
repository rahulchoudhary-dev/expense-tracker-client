import { queryClient } from "@/app/TanstackClientProvider";
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
    onSettled: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["qucik-states"],
        }),
      ]);
    },
  });
};

export default useUpdateBudgetMutation;
