"use client";
import React from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading, authChecked } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (authChecked && !loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, loading, authChecked, router]);

  if (loading || !authChecked) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
