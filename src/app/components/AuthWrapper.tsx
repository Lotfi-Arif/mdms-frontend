"use client";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { checkAuth } from "@/store/auth/authSlice";
import { CircularProgress, Box } from "@mui/material";

// TODO: Add public routes here
const publicRoutes = ["/login", "/register", "/"]; 

export const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      dispatch(checkAuth());
    }
  }, [dispatch, isAuthenticated, loading]);

  useEffect(() => {
    if (
      !loading &&
      !isAuthenticated &&
      pathname &&
      !publicRoutes.includes(pathname)
    ) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
};
