import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchLecturerById } from "@/store/lecturer/lecturerSlice";
import { useCallback } from "react";

export const useLecturer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentLecturer, isLoading, error } = useSelector(
    (state: RootState) => state.lecturer
  );

  const getLecturerById = useCallback(
    (id: string) => {
      dispatch(fetchLecturerById(id));
    },
    [dispatch]
  );

  return {
    currentLecturer,
    isLoading,
    error,
    fetchLecturerById: getLecturerById,
  };
};
