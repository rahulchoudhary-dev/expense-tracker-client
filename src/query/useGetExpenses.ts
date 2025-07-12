import { iExpenseParams } from "@/interfaces/expense";
import axiosConfig, { endpoints } from "@/lib";
import { useQuery } from "@tanstack/react-query";

const fetchExpenses = async (params: iExpenseParams) => {
  const { data } = await axiosConfig.get(endpoints.getExpense, { params });
  return data;
};

const useGetExpenses = (params: iExpenseParams) => {
  return useQuery({
    queryKey: ["get-expenses", params],
    queryFn: () => fetchExpenses(params),
    staleTime: 1000 * 60 * 1,
  });
};

export default useGetExpenses;
