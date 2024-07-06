import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { checkAuth } from "@/store/auth/authSlice";

export const useAuth = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.isAuthenticated && !auth.loading && !authChecked) {
      dispatch(checkAuth());
      setAuthChecked(true);
    }
  }, [auth.isAuthenticated, auth.loading, authChecked, dispatch]);

  return { ...auth, authChecked };
};
