import axiosConfig, { endpoints } from "@/lib";
import { useMutation } from "@tanstack/react-query";

const handleUserProfileUpload = async (formData: FormData) => {
  const res = await axiosConfig.post(endpoints.userProfileUpload, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res;
};

const useUserProfileUpload = () => {
  return useMutation({
    mutationKey: ["upload-user-profile"],
    mutationFn: handleUserProfileUpload,
  });
};

export default useUserProfileUpload;
