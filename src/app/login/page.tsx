// src/app/login/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "../components/AuthForm";
import { login } from "../../store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { LoginCredentials } from "../../types/auth";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { loading } = useAppSelector((state) => state.auth);

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      setError(null);
      const result = await dispatch(login(credentials)).unwrap();
      console.log("Login successful:", result);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <>
      <AuthForm
        isLogin={true}
        onSubmit={handleLogin}
        switchAuthMode={() => router.push("/register")}
      />
      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
      {loading && <div>Loading...</div>}
    </>
  );
}
