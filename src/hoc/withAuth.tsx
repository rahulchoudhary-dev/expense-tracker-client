"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ROUTES from "@/routes";
import { useAppSelector } from "@/hooks/useRedux";

const withAuth = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    const access_token = useAppSelector((state) => state.user);

    useEffect(() => {
      const token = access_token;
      if (!token) {
        router.replace(ROUTES.SIGN_IN);
      } else {
        setAuthorized(true);
      }
      setLoading(false);
    }, [access_token]);

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
