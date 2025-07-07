import { toast } from "sonner";

export const useShowSuccess = () => {
  return (message: string) => {
    toast.success(message);
  };
};

export const useShowError = () => {
  return (message: string) => {
    toast.error(message);
  };
};

export const useShowInfo = () => {
  return (message: string) => {
    toast.message(message, {
      description: "Heads up!",
    });
  };
};
