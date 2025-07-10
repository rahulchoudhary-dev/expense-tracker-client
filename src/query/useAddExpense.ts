import { iExpenseFormData } from "@/interfaces/expense";
import axiosConfig, { endpoints } from "@/lib";
import { useMutation } from "@tanstack/react-query";

const addExpenseRequest = async (data: iExpenseFormData) => {
  const resp = await axiosConfig.post(endpoints.addExpense, data);
  return resp;
};

const useAddExpenseMutation = () => {
  return useMutation({
    mutationKey: ["expense:add"],
    mutationFn: addExpenseRequest,
    retry: 3,
  });
};

export default useAddExpenseMutation;
