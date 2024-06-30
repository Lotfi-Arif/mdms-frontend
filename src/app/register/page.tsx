"use client";

import React from "react";
import AuthForm from "../components/AuthForm";
import { RegisterCredentials } from "../../types/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { register } from "../../store/auth/authSlice";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleRegister = async (credentials: RegisterCredentials) => {
    const result = await dispatch(register(credentials));
    if (register.fulfilled.match(result)) {
      router.push("/dashboard");
    }
  };

  return (
    <AuthForm
      isLogin={false}
      onSubmit={handleRegister}
      switchAuthMode={() => router.push("/login")}
    />
  );
}
