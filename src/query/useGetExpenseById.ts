import axiosConfig, { endpoints, replaceParams } from "@/lib";
import { useQuery } from "@tanstack/react-query";

const fetchExpenseById = async (expenseId: number) => {
  const apiURL = replaceParams(endpoints.getExpenseById, { expenseId });
  const resp = await axiosConfig.get(apiURL);
  return resp.data;
};

const useGetExpenseById = (expenseId: number) => {
  console.log(expenseId);
  return useQuery({
    queryKey: ["expense-details", expenseId],
    queryFn: () => fetchExpenseById(expenseId),
    enabled: !!expenseId,
  });
};

export default useGetExpenseById;
