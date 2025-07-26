import axiosConfig from "@/lib/axios/axiosInstance";
import { endpoints } from "@/lib/axios/endpoints";
import { useQuery } from "@tanstack/react-query";

const fetchBudgets = async (filterValue: string) => {
  const result = await axiosConfig.get(endpoints.getBudget, {
    params: { type: filterValue },
  });
  return result.data;
};

const useGetBudgets = (filter: string) => {
  return useQuery({
    queryKey: ["get-budgets", filter],
    queryFn: () => fetchBudgets(filter),
  });
};

export default useGetBudgets;
