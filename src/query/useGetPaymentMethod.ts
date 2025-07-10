import axiosConfig, { endpoints } from "@/lib";
import { useQuery } from "@tanstack/react-query";

export const fetchPaymentMethods = async () => {
  const response = await axiosConfig.get(endpoints.getPaymentMethods);
  return response.data;
};

const usePaymentMethods = () => {
  return useQuery({
    queryKey: ["payment-methods"],
    queryFn: fetchPaymentMethods,
    staleTime: 1000 * 60 * 5,
  });
};

export default usePaymentMethods;
