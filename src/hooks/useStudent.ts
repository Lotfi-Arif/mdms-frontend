import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchStudentByEmail, fetchStudentProgress } from "@/store/student/studentSlice";
import { useCallback } from "react";

export const useStudent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentStudent, isLoading, error, progress } = useSelector(
    (state: RootState) => state.student
  );

  const getStudentByEmail = useCallback(
    (email: string) => {
      dispatch(fetchStudentByEmail(email));
    },
    [dispatch]
  );

  const getProgress = useCallback(
    (email: string) => {
      dispatch(fetchStudentProgress(email));
    },
    [dispatch]
  );

  return {
    getProgress,
    progress,
    currentStudent,
    isLoading,
    error,
    fetchStudentByEmail: getStudentByEmail,
  };
};
