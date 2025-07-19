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

export const useShowLoading = () => {
  return (message: string) => {
    const toastId = toast.loading(message);
    return toastId;
  };
};

export const useDismissToast = () => {
  return (toastId: string | number) => {
    toast.dismiss(toastId);
  };
};
