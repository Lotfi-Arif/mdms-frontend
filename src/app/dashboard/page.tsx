"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { useRouter } from "next/navigation";
import { fetchUser } from "../../store/auth/authSlice";

export default function Dashboard() {
  const { user, isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (isAuthenticated && !user) {
      dispatch(fetchUser());
    }
  }, [isAuthenticated, user, router, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
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
