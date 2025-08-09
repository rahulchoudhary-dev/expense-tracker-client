import axiosConfig from "@/lib/axios/axiosInstance";
import { endpoints } from "@/lib/axios/endpoints";
import { useQuery } from "@tanstack/react-query";

const fetchFaqCategories = async () => {
  const response = await axiosConfig.get(endpoints.faqCategories);
  return response.data;
};

const useFaqCategories = () => {
  return useQuery({
    queryKey: ["faqCategories"],
    queryFn: fetchFaqCategories,
  });
};

export default useFaqCategories;
