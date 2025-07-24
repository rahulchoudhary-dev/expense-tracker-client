import { queryClient } from "@/app/TanstackClientProvider";
import axiosConfig from "@/lib/axios/axiosInstance";
import { endpoints } from "@/lib/axios/endpoints";
import { replaceParams } from "@/lib/axios/utils";
import { useMutation } from "@tanstack/react-query";

const handleUpdateExpense = async (data: any) => {
  const expenseId = data.id;
  const URL = replaceParams(endpoints.deleteExpense, { id: expenseId });
  const resp = await axiosConfig.patch(URL, data);
  return resp.data;
};

const useUpdateExpenseMutation = (expenseId: number) => {
  expenseId;
  return useMutation({
    mutationKey: ["updateExpense"],
    mutationFn: handleUpdateExpense,

    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["get-expense-by-id", expenseId],
      });

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["get-expenses"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["get-expense-summary"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["analytics-yearly-expenses"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["analytics-category-expenses"],
        }),
      ]);
    },
  });
};

export default useUpdateExpenseMutation;
