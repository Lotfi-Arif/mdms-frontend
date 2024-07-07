"use client";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import LoadingSpinner from "./LoadingSpinner";
import { Typography } from "@mui/material";

const publicRoutes = ["/login", "/register", "/"];

export const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    currentUser,
    refreshToken,
    isLoading,
    error,
    isLoggedIn,
    initializeAuth,
  } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoggedIn) {
      initializeAuth();
    }
  }, [isLoggedIn, initializeAuth]);

  useEffect(() => {
    if (isLoggedIn && !isLoading) {
      if (!refreshToken && !publicRoutes.includes(pathname)) {
        router.replace("/login");
      } else if (currentUser && publicRoutes.includes(pathname)) {
        if (currentUser.lecturer) {
          router.replace("/lecturer/dashboard");
        } else if (currentUser.student) {
          router.replace("/student/progress");
        }
      }
    }
  }, [isLoggedIn, isLoading, currentUser, refreshToken, router, pathname]);

  if (!isLoggedIn || isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    // Display error message instead of returning the error object
    return (
      <Typography color="error">
        An error occurred: {error.toString()}
      </Typography>
    );
  }

  return <>{children}</>;
};
