import { storage } from "@/utils/storageUtils";
import { useMemo } from "react";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const useBootUser = () => {
  const user: User | null = useMemo(() => {
    try {
      const data = storage.get("user");
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }, []);

  return {
    isLoggedIn: !!user,
    user,
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    id: user?.id || "",
  };
};

export default useBootUser;
