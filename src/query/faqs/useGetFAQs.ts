import axiosConfig from "@/lib/axios/axiosInstance";
import { endpoints } from "@/lib/axios/endpoints";
import { useQuery } from "@tanstack/react-query";

const fetchFaqs = async () => {
  const response = await axiosConfig.get(endpoints.faqs);
  return response.data;
};

const useFaqs = () => {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: fetchFaqs,
  });
};

export default useFaqs;
