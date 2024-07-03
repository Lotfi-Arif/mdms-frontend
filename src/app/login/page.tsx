"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { login, clearError } from "../../store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { LoginCredentials } from "../../types/auth";
import { Alert, CircularProgress } from "@mui/material";
import AuthForm from "../components/AuthForm";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    // Clear any existing errors when the component mounts
    dispatch(clearError());
  }, [dispatch]);

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      await dispatch(login(credentials)).unwrap();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}
        <AuthForm
          isLogin={true}
          onSubmit={handleLogin}
          switchAuthMode={() => router.push("/register")}
        />
        {loading && (
          <div className="flex justify-center mt-4">
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
}
