import axiosConfig, { endpoints, replaceParams } from "@/lib";
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
