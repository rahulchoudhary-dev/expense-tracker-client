import axiosConfig from "@/lib/axios/axiosInstance";
import { endpoints } from "@/lib/axios/endpoints";
import { useQuery } from "@tanstack/react-query";

const fetchUserRating = async () => {
  const response = await axiosConfig.get(endpoints.addRatings);
  return response.data;
};

const useGetRating = () => {
  return useQuery({
    queryKey: ["rating"],
    queryFn: fetchUserRating,
  });
};

export default useGetRating;
