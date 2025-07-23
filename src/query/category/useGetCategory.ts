import axiosConfig from "@/lib/axios/axiosInstance";
import { endpoints } from "@/lib/axios/endpoints";
import { useQuery } from "@tanstack/react-query";

const fetchCategories = async () => {
  const resp = await axiosConfig.get(endpoints.getCategories);
  return resp.data;
};

const useGetCategory = () => {
  return useQuery({
    queryKey: ["get-category"],
    queryFn: fetchCategories,
  });
};

export default useGetCategory;
