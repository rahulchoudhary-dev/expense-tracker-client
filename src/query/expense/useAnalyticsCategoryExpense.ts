import axiosConfig from "@/lib/axios/axiosInstance";
import { endpoints } from "@/lib/axios/endpoints";
import { useQuery } from "@tanstack/react-query";

const fetchAnalyticsCategoryExpenses = async (params: any) => {
  const response = await axiosConfig.get(
    endpoints.getAnalyticsCategoryExpenses,
    {
      params,
    }
  );
  return response;
};

const useAnalyticsCategoryExpenses = (params: any) => {
  return useQuery({
    queryKey: ["analytics-category-expenses", params?.year, params?.month],
    queryFn: () => fetchAnalyticsCategoryExpenses(params),
  });
};

export default useAnalyticsCategoryExpenses;
