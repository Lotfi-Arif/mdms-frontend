"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { Box, Paper, Skeleton, Typography } from "@mui/material";

const AuthForm = dynamic(() => import("../components/AuthForm"), {
  ssr: false,
});

export default function LoginPage() {
  const { currentUser, isLoading, error } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (currentUser && !isRedirecting) {
      setIsRedirecting(true);
      if (currentUser.lecturer && pathname !== "/lecturer/dashboard") {
        router.push("/lecturer/dashboard");
      } else if (currentUser.student && pathname !== "/student/progress") {
        router.push("/student/progress");
      } else {
        setIsRedirecting(false);
      }
    }
  }, [currentUser, router, isRedirecting, pathname]);

  if (!isMounted || isLoading || isRedirecting) {
    return (
      <Box sx={{ p: 2, maxWidth: 400, margin: "auto" }}>
        <Skeleton variant="rectangular" height={60} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={40} sx={{ mb: 1 }} />
        <Skeleton variant="rectangular" height={40} sx={{ mb: 1 }} />
        <Skeleton variant="rectangular" height={40} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <Paper elevation={6} sx={{ p: 4, maxWidth: 400, width: "100%" }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </Typography>
        <AuthForm isLogin={true} />
      </Paper>
      {error && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
