import axiosConfig from "@/lib/axios/axiosInstance";
import { endpoints } from "@/lib/axios/endpoints";
import { replaceParams } from "@/lib/axios/utils";
import { useMutation } from "@tanstack/react-query";

const handleDeleteBudget = async (id: number) => {
  const apiURI = replaceParams(endpoints.deleteBudget, { id });
  const result = await axiosConfig.delete(apiURI);
  return result;
};

const useDeleteBudget = () => {
  return useMutation({
    mutationKey: ["delete-budget"],
    mutationFn: handleDeleteBudget,
  });
};

export default useDeleteBudget;
