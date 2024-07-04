"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.student) {
        router.push("/student/progress");
      } else if (user?.lecturer) {
        if (user.lecturer.supervisor) {
          router.push("/supervisor/student-progress");
        } else if (user.lecturer.examiner) {
          router.push("/examiner/viva-evaluations");
        } else {
          router.push("/lecturer/dashboard");
        }
      }
    } else {
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

  return null;
}
