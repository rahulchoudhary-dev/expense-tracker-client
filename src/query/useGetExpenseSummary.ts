import axiosConfig, { endpoints } from "@/lib";
import { useMutation } from "@tanstack/react-query";

interface ifetchExpenseSummary {
  userId: string;
}

const fetchExpenseSummary = async (data: ifetchExpenseSummary) => {
  const resp = await axiosConfig.get(endpoints.getExpenseSummary, {
    params: data,
  });
  return resp.data;
};

const useGetExpenseSummary = () => {
  return useMutation({
    mutationKey: ["get-expense-summary"],
    mutationFn: fetchExpenseSummary,
    retry: 3,
  });
};

export default useGetExpenseSummary;
