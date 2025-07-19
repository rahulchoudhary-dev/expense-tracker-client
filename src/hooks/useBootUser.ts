import { store } from "@/redux/store";

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
  profileUrl?: string;
}

const useBootUser = () => {
  const user = store.getState().user.user;

  return {
    user,
    isLoggedIn: !!user,
    userId: user?.id || "",
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
    profileUrl: user?.profileUrl,
  };
};

export default useBootUser;
