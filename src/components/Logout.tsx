"use client";
import { useShowSuccess } from "@/app/toastProvider";
import ROUTES from "@/routes";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useSidebar } from "./ui/sidebar";
import { useAppDispatch } from "@/hooks/useRedux";
import { clearUser } from "@/redux/slices/userSlice";

const Logout = () => {
  const dispatch = useAppDispatch();
  const { open } = useSidebar();
  const showSuccessToast = useShowSuccess();
  const router = useRouter();

  const logoutAction = () => {
    router.push(ROUTES.SIGN_IN);
    dispatch(clearUser());
    showSuccessToast("Logged out successfully");
  };

  const handleLogout = () => {
    const toastId = toast("Confirm Logout", {
      position: "top-center",
      duration: 10000,
      description: (
        <div className="flex gap-4 justify-center mt-2">
          <Button
            variant="outline"
            className="text-sm text-blue-600 hover:text-blue-600 cursor-pointer hover:underline  dark:text-blue-600"
            onClick={() => toast.dismiss(toastId)}
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            className="text-sm text-red-600 hover:text-red-600 cursor-pointer hover:underline"
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
      variant="ghost"
      onClick={handleLogout}
      className="w-full justify-start space-x-3 text-red-600 hover:text-red-700 dark:hover:text-white hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900"
    >
      <LogOut className="h-5 w-5" />
      {open && <span>Sign Out</span>}
    </Button>
  );
};

export default Logout;
