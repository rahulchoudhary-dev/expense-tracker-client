"use client";
import { useShowSuccess } from "@/app/toastProvider";
import ROUTES from "@/routes";
import { storage } from "@/utils/storageUtils";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const Logout = () => {
  const showSuccessToast = useShowSuccess();
  const router = useRouter();

  const logoutAction = () => {
    storage.clear();
    router.push(ROUTES.SIGN_IN);
    showSuccessToast("Logged out successfully");
  };

  const handleLogout = () => {
    const toastId = toast("Confirm Logout", {
      position: "top-center",
      duration: 10000,
      description: (
        <div className="flex gap-4 justify-center mt-2">
          <button
            className="text-sm text-blue-600 cursor-pointer hover:underline"
            onClick={() => toast.dismiss(toastId)}
          >
            Cancel
          </button>
          <button
            className="text-sm text-red-600 cursor-pointer hover:underline"
            onClick={() => {
              toast.dismiss(toastId);
              logoutAction();
            }}
          >
            Confirm
          </button>
        </div>
      ),
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-white cursor-pointer hover:scale-125 rounded-full w-10 h-10 flex items-center justify-center"
    >
      <LogOut color="red" />
    </button>
  );
};

export default Logout;
