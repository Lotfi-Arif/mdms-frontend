import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthState, RegisterCredentials, Token } from "../../types/auth";
import {
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
} from "../../utils/localStorage";
import {
  Lecturer,
  Student,
  User,
} from "@lotfiarif-development/mdms-prisma-schema";

const API_URL = "http://localhost:3001/auth";

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      setLocalStorageItem("token", response.data.accessToken);
      await dispatch(fetchUser());
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data || "Login failed");
    }
  }
);

export const register = createAsyncThunk<
  Token,
  RegisterCredentials,
  { rejectValue: string }
>("auth/register", async (credentials, { dispatch, rejectWithValue }) => {
  try {
    const response = await axios.post<Token>(
      `${API_URL}/register`,
      credentials
    );
    setLocalStorageItem("token", response.data.accessToken);
    await dispatch(fetchUser());
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Registration failed"
    );
  }
});

export const fetchUser = createAsyncThunk<
  User & { student?: Student; lecturer?: Lecturer },
  void,
  { rejectValue: string }
>("auth/fetchUser", async (_, { rejectWithValue }) => {
  try {
    const token = getLocalStorageItem("token");
    if (!token) throw new Error("No token found");
    const response = await axios.get<
      User & { student?: Student; lecturer?: Lecturer }
    >(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch user"
    );
  }
});

const initialState: AuthState = {
  user: null,
  token: getLocalStorageItem("token"),
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      removeLocalStorageItem("token");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<Token>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<Token>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.accessToken;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUser.fulfilled,
        (
          state,
          action: PayloadAction<
            User & { student?: Student; lecturer?: Lecturer }
          >
        ) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = action.payload;
        }
      )
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user";
        state.isAuthenticated = false;
        state.token = null;
        removeLocalStorageItem("token");
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
