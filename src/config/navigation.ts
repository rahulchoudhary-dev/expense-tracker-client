import {
  LayoutDashboard,
  Wallet,
  BarChart2,
  PiggyBank,
  Settings,
  User,
} from "lucide-react";

export const mainMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Expenses",
    url: "#",
    icon: Wallet,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart2,
  },
  {
    title: "Budget",
    url: "/budget",
    icon: PiggyBank,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
];

export const settingsItems = [
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
