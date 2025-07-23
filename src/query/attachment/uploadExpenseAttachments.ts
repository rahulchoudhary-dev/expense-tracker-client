import axiosConfig from "@/lib/axios/axiosInstance";
import { endpoints } from "@/lib/axios/endpoints";
import { useMutation } from "@tanstack/react-query";

const uploadExpenseAttachmentsRequest = async (formData: FormData) => {
  const resp = await axiosConfig.post(
    endpoints.uploadExpenseAttachments,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return resp;
};

const useUploadExpenseAttachments = () => {
  return useMutation({
    mutationKey: ["expense-attachments"],
    mutationFn: uploadExpenseAttachmentsRequest,
  });
};

export default useUploadExpenseAttachments;
