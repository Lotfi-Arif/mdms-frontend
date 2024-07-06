"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { useRouter } from "next/navigation";
import { fetchUser } from "../../store/auth/authSlice";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function Dashboard() {
  const { user, isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && !user && !loading) {
      dispatch(fetchUser());
    }
  }, [isAuthenticated, user, loading, dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    router.replace("/login");
    return null;
  }

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
