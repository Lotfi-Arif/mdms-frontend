"use client";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import LoadingSpinner from "./LoadingSpinner";

const publicRoutes = ["/login", "/register", "/"];

export const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, loading, authChecked } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (
      authChecked &&
      !loading &&
      !isAuthenticated &&
      !publicRoutes.includes(pathname as string)
    ) {
      router.replace("/login");
    }
  }, [isAuthenticated, loading, authChecked, router, pathname]);

  if (loading || !authChecked) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};
