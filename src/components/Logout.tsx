"use client";
import { useShowSuccess } from "@/app/toastProvider";
import ROUTES from "@/routes";
import { storage } from "@/utils/storageUtils";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { STORAGE_KEYS } from "@/constant";

const Logout = () => {
  const showSuccessToast = useShowSuccess();
  const router = useRouter();

  const logoutAction = () => {
    router.push(ROUTES.SIGN_IN);
    showSuccessToast("Logged out successfully");
    storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
    storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
    storage.remove(STORAGE_KEYS.USER);
  };

  const handleLogout = () => {
    const toastId = toast("Confirm Logout", {
      position: "top-center",
      duration: 10000,
      description: (
        <div className="flex gap-4 justify-center mt-2">
          <Button
            variant="outline"
            className="text-sm text-blue-600 cursor-pointer hover:underline"
            onClick={() => toast.dismiss(toastId)}
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            className="text-sm text-red-600 cursor-pointer hover:underline"
            onClick={() => {
              toast.dismiss(toastId);
              logoutAction();
            }}
          >
            Confirm
          </Button>
        </div>
      ),
    });
  };

  return (
    <Button
      size={"icon"}
      variant="outline"
      onClick={handleLogout}
      className="bg-white cursor-pointer hover:scale-125 rounded-full w-10 h-10 flex items-center justify-center"
    >
      <LogOut color="red" />
    </Button>
  );
};

export default Logout;
