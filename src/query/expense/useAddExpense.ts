import { ExpenseParams } from "@/app/(main)/dashboard/types";
import { queryClient } from "@/app/TanstackClientProvider";
import axiosConfig from "@/lib/axios/axiosInstance";
import { endpoints } from "@/lib/axios/endpoints";
import { useMutation } from "@tanstack/react-query";

const addExpenseRequest = async (data: any) => {
  const resp = await axiosConfig.post(endpoints.addExpense, data);
  return resp;
};

const useAddExpenseMutation = () => {
  return useMutation({
    mutationKey: ["expense:add"],
    mutationFn: addExpenseRequest,
    onSettled: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["get-expenses"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["get-expense-summary"],
        }),
      ]);
    },
  });
};

export default useAddExpenseMutation;
