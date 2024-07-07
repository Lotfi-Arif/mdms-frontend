"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Box, CircularProgress } from "@mui/material";

export default function Home() {
  const { currentUser, isLoading, isLoggedIn, initializeAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn) {
        router.push("/login");
      } else if (currentUser) {
        if (currentUser.lecturer) {
          router.push("/lecturer/dashboard");
        } else if (currentUser.student) {
          router.push("/student/progress");
        }
      }
    }
  }, [currentUser, isLoading, isLoggedIn, router]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // This should never be rendered as the user will be redirected
  return null;
}
