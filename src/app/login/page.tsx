"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { login, clearError } from "../../store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { LoginCredentials } from "../../types/auth";
import { Alert, CircularProgress, Box, Typography } from "@mui/material";
import AuthForm from "../components/AuthForm";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error, isAuthenticated, user } = useAppSelector(
    (state) => state.auth
  );

  // useEffect(() => {
  //   if (isAuthenticated && user) {
  //     if (user.student) {
  //       router.push("/student/progress");
  //     } else if (user.lecturer) {
  //       if (user.lecturer.supervisor) {
  //         router.push("/supervisor/student-progress");
  //       } else if (user.lecturer.examiner) {
  //         router.push("/examiner/viva-evaluations");
  //       } else {
  //         router.push("/lecturer/dashboard");
  //       }
  //     } else {
  //       router.push("/dashboard");
  //     }
  //   }
  // }, [isAuthenticated, user, router]);

  // useEffect(() => {
  //   dispatch(clearError());
  // }, [dispatch]);

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      await dispatch(login(credentials)).unwrap();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 400, p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <AuthForm
          isLogin={true}
          onSubmit={handleLogin}
          switchAuthMode={() => router.push("/register")}
        />
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
}
