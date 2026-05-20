"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { ProtectedRouteSkeleton } from "./SkeletonLoader";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session, isPending } = authClient.useSession();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isPending) {
      if (!session) {
        const currentPath =
          pathname +
          (searchParams.toString() ? `?${searchParams.toString()}` : "");
        router.push(`/log-in?redirect=${encodeURIComponent(currentPath)}`);
      }
      setIsChecking(false);
    }
  }, [session, isPending, router, pathname, searchParams]);

  if (isPending || isChecking) {
    return <ProtectedRouteSkeleton />;
  }

  if (session) {
    return children;
  }

  return null;
};

export default ProtectedRoute;
