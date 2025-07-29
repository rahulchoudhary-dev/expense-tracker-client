import axiosConfig from "@/lib/axios/axiosInstance";
import { endpoints } from "@/lib/axios/endpoints";
import { useQuery } from "@tanstack/react-query";

const fetchBudgetQuickStates = async () => {
  const result = await axiosConfig.get(endpoints.budgetQuickStates);
  return result.data;
};

const useBudgetQuickStates = () => {
  return useQuery({
    queryKey: ["qucik-states"],
    queryFn: fetchBudgetQuickStates,
    staleTime: 1000 * 60 * 1,
  });
};

export default useBudgetQuickStates;
