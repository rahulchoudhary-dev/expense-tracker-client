import axiosConfig, { endpoints } from "@/lib";
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
