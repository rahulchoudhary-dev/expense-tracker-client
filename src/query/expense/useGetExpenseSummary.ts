import axiosConfig from "@/lib/axios/axiosInstance";
import { endpoints } from "@/lib/axios/endpoints";
import { useQuery } from "@tanstack/react-query";

interface ifetchExpenseSummary {
  userId: string | undefined;
}

const fetchExpenseSummary = async (data: ifetchExpenseSummary) => {
  const resp = await axiosConfig.get(endpoints.getExpenseSummary, {
    params: data,
  });
  console.log("resp", resp);
  return resp?.data ? resp.data : {};
};

const useGetExpenseSummary = (params: ifetchExpenseSummary) => {
  return useQuery({
    queryKey: ["get-expense-summary", params?.userId],
    queryFn: () => fetchExpenseSummary(params),
    staleTime: 1000 * 60 * 1,
    enabled: !!params?.userId,
  });
};

export default useGetExpenseSummary;
