import axiosConfig from "@/lib/axios/axiosInstance";
import { endpoints } from "@/lib/axios/endpoints";
import { replaceParams } from "@/lib/axios/utils";
import { useQuery } from "@tanstack/react-query";

const fetchExpenseById = async (expenseId: number) => {
  const apiURL = replaceParams(endpoints.getExpenseById, { expenseId });
  const resp = await axiosConfig.get(apiURL);
  return resp.data;
};

const useGetExpenseById = (expenseId: number) => {
  return useQuery({
    queryKey: ["get-expense-by-id", expenseId], // ✅ descriptive key
    queryFn: () => fetchExpenseById(expenseId),
    enabled: !!expenseId,
    staleTime: 1000 * 60 * 1,
  });
};

export default useGetExpenseById;
