import axiosConfig from "@/lib/axios/axiosInstance";
import { endpoints } from "@/lib/axios/endpoints";
import { useMutation } from "@tanstack/react-query";

const createRating = async (ratingData: any) => {
  const response = await axiosConfig.post(endpoints.addRatings, ratingData);
  return response;
};

const useCreateRating = () => {
  return useMutation({
    mutationKey: ["createRating"],
    mutationFn: createRating,
  });
};

export default useCreateRating;
