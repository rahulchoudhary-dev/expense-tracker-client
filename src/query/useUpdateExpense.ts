import { queryClient } from "@/app/TanstackClientProvider";
import axiosConfig, { endpoints, replaceParams } from "@/lib";
import { useMutation } from "@tanstack/react-query";

const handleUpdateExpense = async (data: any) => {
  console.log("datata", data);
  const expenseId = data.id;
  const URL = replaceParams(endpoints.deleteExpense, { id: expenseId });
  const resp = await axiosConfig.patch(URL, data);
  return resp.data;
};

const useUpdateExpenseMutation = () => {
  return useMutation({
    mutationKey: ["updateExpense"],
    mutationFn: handleUpdateExpense,

    onSuccess: async () => {
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
