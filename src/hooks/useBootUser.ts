import { STORAGE_KEYS } from "@/constant";
import { storage } from "@/utils/storageUtils";
import { useMemo } from "react";

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  fullName: string;
  address?: string;
  phone?: string;
  isActive?: string;
  bio?: string;
  subscriptionStatus?: string;
  role?: string;
}

const useBootUser = () => {
  const user: User | null = useMemo(() => {
    try {
      const data = storage.get(STORAGE_KEYS.USER);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }, []);

  return {
    user,
    isLoggedIn: !!user,
    id: user?.id || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    fullName: user?.fullName || "",
    email: user?.email || "",
    createdAt: user?.createdAt || "",
    address: user?.address || "",
    phone: user?.phone || "",
    isActive: user?.isActive || "",
    bio: user?.bio || "",
    subscriptionStatus: user?.subscriptionStatus || "",
    role: user?.role || "",
  };
};

export default useBootUser;
