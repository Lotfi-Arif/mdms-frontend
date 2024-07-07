import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchStudentById } from "@/store/student/studentSlice";
import { useCallback } from "react";

export const useStudent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentStudent, isLoading, error } = useSelector(
    (state: RootState) => state.student
  );

  const getStudentById = useCallback(
    (id: string) => {
      dispatch(fetchStudentById(id));
    },
    [dispatch]
  );

  return {
    currentStudent,
    isLoading,
    error,
    fetchStudentById: getStudentById,
  };
};
