import axiosConfig from "@/lib/axios/axiosInstance";
import { endpoints } from "@/lib/axios/endpoints";
import { replaceParams } from "@/lib/axios/utils";
import { useMutation } from "@tanstack/react-query";

const deleteExpenseAttachment = async (attachmentId: number) => {
  const apiURL = replaceParams(endpoints.deleteExpenseAttachment, {
    attachmentId,
  });
  const resp = await axiosConfig.delete(apiURL);
  return resp;
};

const useDeleteExpenseAttachment = () => {
  return useMutation({
    mutationKey: ["delete-expense-attachment"],
    mutationFn: deleteExpenseAttachment,
  });
};

export default useDeleteExpenseAttachment;
