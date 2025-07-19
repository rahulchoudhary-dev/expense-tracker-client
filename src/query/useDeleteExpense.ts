import { queryClient } from "@/app/TanstackClientProvider";
import { useShowError, useShowSuccess } from "@/app/toastProvider";
import axiosConfig, { endpoints, replaceParams } from "@/lib";
import { useMutation } from "@tanstack/react-query";

const handleDeleteExpense = async (expenseId: string) => {
  const URL = replaceParams(endpoints.deleteExpense, { id: expenseId });
  const response = await axiosConfig.delete(URL);
  return response;
};
const useDeleteExpense = (expenseId: string) => {
  const showSuccess = useShowSuccess();
  const showError = useShowError();

  return useMutation({
    mutationKey: ["deleteExpense", expenseId],
    mutationFn: handleDeleteExpense,
    onSuccess: () => {
      showSuccess("Expense deleted successfully");
    },
    onError: (error: any) => {
      showError(error.message);
    },
    onSettled: async () => {
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
    retry: false,
  });
};

export default useDeleteExpense;
