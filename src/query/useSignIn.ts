import { STORAGE_KEYS } from "@/constant";
import axiosConfig, { endpoints } from "@/lib";
import { storage } from "@/utils/storageUtils";
import { useMutation } from "@tanstack/react-query";

interface iSignIn {
  email: string;
  password: string;
}

const signInHandler = async (data: iSignIn) => {
  const resp = await axiosConfig.post(endpoints.sigIn, data);
  return resp;
};

const useSignIn = () => {
  return useMutation({
    mutationKey: ["auth", "signin"],
    mutationFn: signInHandler,
    onSuccess: (data) => {
      const user = data?.data;
      if (user) {
        storage.set(STORAGE_KEYS.USER, JSON.stringify(user));
        storage.set(
          STORAGE_KEYS.USER_PROFILE_URL,
          JSON.stringify(user?.userMedia?.[0]?.url)
        );
      }
    },
  });
};

export default useSignIn;
