"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import dynamic from "next/dynamic";

const LoadingSpinner = dynamic(() => import("@/app/components/LoadingSpinner"));

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, user, loading, authChecked } = useAuth();

  useEffect(() => {
    if (authChecked && !loading) {
      if (!isAuthenticated) {
        router.replace("/login");
      } else if (user?.student) {
        router.replace("/student/progress");
      } else if (user?.lecturer) {
        router.replace("/lecturer/dashboard");
      }
    }
  }, [isAuthenticated, user, loading, authChecked, router]);

  if (loading || !authChecked) {
    return <LoadingSpinner />;
  }

  return null;
}
