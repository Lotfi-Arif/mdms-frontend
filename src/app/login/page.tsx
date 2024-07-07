"use client";

import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";

export default function LoginPage() {
  const { currentUser, isLoading } = useAuth();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (currentUser && !isRedirecting) {
      setIsRedirecting(true);
      if (currentUser.lecturer) {
        router.push("/lecturer/dashboard");
      } else if (currentUser.student) {
        router.push("/student/progress");
      }
    }
  }, [currentUser, router, isRedirecting]);

  if (isLoading || isRedirecting) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
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
    </Box>
  );
}
