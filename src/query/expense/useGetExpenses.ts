import { ExpenseParams } from "@/app/(main)/dashboard/types";
import axiosConfig from "@/lib/axios/axiosInstance";
import { endpoints } from "@/lib/axios/endpoints";
import { useQuery } from "@tanstack/react-query";

const fetchExpenses = async (params: ExpenseParams) => {
  const { data } = await axiosConfig.get(endpoints.getExpense, { params });
  return data;
};

const useGetExpenses = (params: ExpenseParams) => {
  return useQuery({
    queryKey: ["get-expenses", params],
    queryFn: () => fetchExpenses(params),
    staleTime: 1000 * 60 * 1,
  });
};

export default useGetExpenses;
