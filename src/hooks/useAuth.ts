import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { login, logout, initializeAuth } from "@/store/auth/authSlice";
import { useCallback } from "react";
import { LoginCredentials } from "@/types/auth";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser, refreshToken, isLoading, error, isLoggedIn } =
    useSelector((state: RootState) => state.auth);

  const loginUser = useCallback(
    async (credentials: LoginCredentials) => {
      const resultAction = await dispatch(login(credentials));
      if (login.rejected.match(resultAction)) {
        throw new Error(resultAction.payload || "Login failed");
      }
      return resultAction.payload;
    },
    [dispatch]
  );

  const logoutUser = useCallback(() => {
    return dispatch(logout());
  }, [dispatch]);

  const initAuth = useCallback(() => {
    return dispatch(initializeAuth());
  }, [dispatch]);

  return {
    currentUser,
    refreshToken,
    isLoading,
    error,
    isLoggedIn,
    loginUser,
    logoutUser,
    initializeAuth: initAuth,
  };
};
