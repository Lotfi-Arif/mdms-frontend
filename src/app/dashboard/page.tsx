"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>Welcome to your dashboard, {user.firstName}!</h1>
      {/* Add your dashboard content here */}
    </div>
  );
}
