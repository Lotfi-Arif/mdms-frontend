import { Nomination, Viva } from "@lotfiarif-development/mdms-prisma-schema";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/utils/axiosConfig";

interface VivaState {
  vivas: Viva[];
  currentViva: Viva | null;
  nominations: Nomination[];
  isLoading: boolean;
  error: string | null;
}

const initialState: VivaState = {
  vivas: [],
  currentViva: null,
  nominations: [],
  isLoading: false,
  error: null,
};

export const fetchVivas = createAsyncThunk(
  "viva/fetchVivas",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/vivas");
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const createViva = createAsyncThunk(
  "viva/createViva",
  async (vivaData: Partial<Viva>, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/vivas", vivaData);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchNominations = createAsyncThunk(
  "viva/fetchNominations",
  async (examinerId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/nominations/${examinerId}`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const respondToNomination = createAsyncThunk(
  "viva/respondToNomination",
  async (
    { nominationId, accept }: { nominationId: string; accept: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(
        `/api/nominations/${nominationId}/respond`,
        { accept }
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const vivaSlice = createSlice({
  name: "viva",
  initialState,
  reducers: {
    setVivas: (state, action: PayloadAction<Viva[]>) => {
      state.vivas = action.payload;
    },
    setCurrentViva: (state, action: PayloadAction<Viva | null>) => {
      state.currentViva = action.payload;
    },
    addViva: (state, action: PayloadAction<Viva>) => {
      state.vivas.push(action.payload);
    },
    updateViva: (state, action: PayloadAction<Viva>) => {
      const index = state.vivas.findIndex((v) => v.id === action.payload.id);
      if (index !== -1) {
        state.vivas[index] = action.payload;
      }
      if (state.currentViva && state.currentViva.id === action.payload.id) {
        state.currentViva = action.payload;
      }
    },
    deleteViva: (state, action: PayloadAction<string>) => {
      state.vivas = state.vivas.filter((v) => v.id !== action.payload);
      if (state.currentViva && state.currentViva.id === action.payload) {
        state.currentViva = null;
      }
    },
    setNominations: (state, action: PayloadAction<Nomination[]>) => {
      state.nominations = action.payload;
    },
    addNomination: (state, action: PayloadAction<Nomination>) => {
      state.nominations.push(action.payload);
    },
    updateNomination: (state, action: PayloadAction<Nomination>) => {
      const index = state.nominations.findIndex(
        (n) => n.id === action.payload.id
      );
      if (index !== -1) {
        state.nominations[index] = action.payload;
      }
    },
    deleteNomination: (state, action: PayloadAction<string>) => {
      state.nominations = state.nominations.filter(
        (n) => n.id !== action.payload
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVivas.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVivas.fulfilled, (state, action: PayloadAction<Viva[]>) => {
        state.isLoading = false;
        state.vivas = action.payload;
        state.error = null;
      })
      .addCase(fetchVivas.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createViva.fulfilled, (state, action: PayloadAction<Viva>) => {
        state.vivas.push(action.payload);
      })
      .addCase(
        fetchNominations.fulfilled,
        (state, action: PayloadAction<Nomination[]>) => {
          state.nominations = action.payload;
        }
      )
      .addCase(
        respondToNomination.fulfilled,
        (state, action: PayloadAction<Nomination>) => {
          const index = state.nominations.findIndex(
            (n) => n.id === action.payload.id
          );
          if (index !== -1) {
            state.nominations[index] = action.payload;
          }
        }
      );
  },
});

export const {
  setVivas,
  setCurrentViva,
  addViva,
  updateViva,
  deleteViva,
  setNominations,
  addNomination,
  updateNomination,
  deleteNomination,
  setLoading,
  setError,
} = vivaSlice.actions;

export default vivaSlice.reducer;
