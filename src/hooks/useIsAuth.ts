"use client";
import { usePathname } from "next/navigation";

export const useIsAuth = () => {
  const pathname = usePathname();
  return (
    pathname.startsWith("/auth/signup") || pathname.startsWith("/auth/signup")
  );
};
