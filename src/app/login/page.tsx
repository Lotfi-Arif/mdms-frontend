"use client";

import React from "react";
import AuthForm from "../components/AuthForm";
import { LoginCredentials } from "../../types/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { login } from "../../store/auth/authSlice";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogin = async (credentials: LoginCredentials) => {
    const result = await dispatch(login(credentials));
    if (login.fulfilled.match(result)) {
      router.push("/dashboard");
    }
  };

  return (
    <AuthForm
      isLogin={true}
      onSubmit={handleLogin}
      switchAuthMode={() => router.push("/register")}
    />
  );
}
