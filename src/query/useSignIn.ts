import axiosConfig, { endpoints } from "@/lib";
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
      console.log("sigin done", data);
    },
    onError: (error) => {
      console.error("Sign up failed:", error);
    },
  });
};

export default useSignIn;
