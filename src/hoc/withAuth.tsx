"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { storage } from "@/utils/storageUtils";
import { STORAGE_KEYS } from "@/constant";
import ROUTES from "@/routes";

const withAuth = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
      const token = storage.get(STORAGE_KEYS.ACCESS_TOKEN);
      if (!token) {
        router.replace(ROUTES.SIGN_IN);
      } else {
        setAuthorized(true);
      }
      setLoading(false);
    }, []);

    if (loading)
      return (
        <div className="flex w-full h-screen justify-center items-center">
          Loading...
        </div>
      );
    return authorized ? <Component {...props} /> : null;
  };

  return AuthenticatedComponent;
};

export default withAuth;
