"use client";

import axiosConfig, { endpoints } from "@/lib";
import { useQuery } from "@tanstack/react-query";

const fetchAnalyticsYearlyExpenses = async (data: any) => {
  const response = await axiosConfig.get(endpoints.getAnalyticsYearlyExpenses, {
    params: data,
  });
  return response;
};

const useAnalyticsYearlyExpenses = (params: any) => {
  return useQuery({
    queryKey: ["analytics-yearly-expenses", params?.year],
    queryFn: () => fetchAnalyticsYearlyExpenses(params),
  });
};

export default useAnalyticsYearlyExpenses;
