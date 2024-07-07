import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/axiosConfig";
import { FullUserWithoutPassword, LoginCredentials } from "@/types/auth";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem,
} from "@/utils/localStorage";
import { AppDispatch, RootState } from "..";

interface AuthState {
  currentUser: FullUserWithoutPassword | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  currentUser: JSON.parse(getLocalStorageItem("userData") || "null") || null,
  refreshToken: getLocalStorageItem("refreshToken") || null,
  isLoading: false,
  error: null,
  isLoggedIn: !!getLocalStorageItem("refreshToken"),
};

export const login = createAsyncThunk<
  {
    refreshToken: string;
    user: FullUserWithoutPassword;
  },
  LoginCredentials,
  { rejectValue: string; state: RootState; dispatch: AppDispatch }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post<{
      refreshToken: string;
      user: FullUserWithoutPassword;
    }>("/auth/login", credentials);
    setLocalStorageItem("refreshToken", response.data.refreshToken);
    setLocalStorageItem("currentUser", JSON.stringify(response.data.user));

    return {
      refreshToken: response.data.refreshToken,
      user: response.data.user,
    };
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data.message || "Login failed");
    }
    return rejectWithValue("An unknown error occurred");
  }
});

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as { auth: AuthState };
      if (auth.currentUser) {
        await api.post(`/auth/logout`, { userId: auth.currentUser.id });
      }
      removeLocalStorageItem("refreshToken");
      removeLocalStorageItem("currentUser");
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

export const initializeAuth = createAsyncThunk<
  FullUserWithoutPassword | null,
  void,
  { rejectValue: string; state: RootState; dispatch: AppDispatch }
>("auth/initializeAuth", async (_, { getState, dispatch, rejectWithValue }) => {
  try {
    const { auth } = getState() as { auth: AuthState };
    if (auth.refreshToken && !auth.currentUser) {
      return dispatch(fetchCurrentUser()).unwrap();
    }
    return null;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Initialization failed"
    );
  }
});

export const fetchCurrentUser = createAsyncThunk<
  FullUserWithoutPassword,
  void,
  { rejectValue: string; state: RootState }
>("auth/fetchCurrentUser", async (_, { getState, rejectWithValue }) => {
  try {
    const { auth } = getState();
    if (!auth.refreshToken) {
      throw new Error("No refresh token available");
    }
    const response = await api.get<FullUserWithoutPassword>("/auth/me");
    setLocalStorageItem("currentUser", JSON.stringify(response.data));
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch user data"
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearUser(state) {
      state.currentUser = null;
      state.refreshToken = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload.user;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Login failed";
        state.isLoggedIn = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.currentUser = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(initializeAuth.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.error = null;
        state.isLoggedIn = true;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isLoggedIn = false;
      });
  },
});

export const { clearError, clearUser } = authSlice.actions;
export default authSlice.reducer;
