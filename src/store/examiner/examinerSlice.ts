import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/utils/axiosConfig";
import {
  Examiner,
  Nomination,
  Viva,
  Lecturer,
  Project,
} from "@lotfiarif-development/mdms-prisma-schema";

interface ExaminerState {
  examiners: Examiner[];
  currentExaminer: Examiner | null;
  nominations: Nomination[];
  vivas: Viva[];
  lecturers: Lecturer[];
  projects: Project[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ExaminerState = {
  examiners: [],
  currentExaminer: null,
  nominations: [],
  vivas: [],
  lecturers: [],
  projects: [],
  isLoading: false,
  error: null,
};

export const fetchExaminers = createAsyncThunk(
  "examiner/fetchExaminers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/examiners");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchExaminerById = createAsyncThunk(
  "examiner/fetchExaminerById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/examiners/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchNominations = createAsyncThunk(
  "examiner/fetchNominations",
  async (examinerId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/examiners/${examinerId}/nominations`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const acceptNomination = createAsyncThunk(
  "examiner/acceptNomination",
  async (
    { nominationId, vivaData }: { nominationId: string; vivaData: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(
        `/examiners/${nominationId}/accept-nomination`,
        vivaData
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const rejectNomination = createAsyncThunk(
  "examiner/rejectNomination",
  async (nominationId: string, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/examiners/${nominationId}/reject-nomination`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const evaluateStudent = createAsyncThunk(
  "examiner/evaluateStudent",
  async (
    {
      vivaId,
      evaluation,
      hasPassed,
    }: { vivaId: string; evaluation: string; hasPassed: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(`/examiners/${vivaId}/evaluate`, {
        evaluation,
        hasPassed,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchLecturers = createAsyncThunk(
  "examiner/fetchLecturers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/examiners/lecturers");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProjects = createAsyncThunk(
  "examiner/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/examiners/projects");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchVivaDetails = createAsyncThunk(
  "examiner/fetchVivaDetails",
  async (examinerId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/examiners/${examinerId}/vivas`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const examinerSlice = createSlice({
  name: "examiner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExaminers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchExaminers.fulfilled,
        (state, action: PayloadAction<Examiner[]>) => {
          state.isLoading = false;
          state.examiners = action.payload;
        }
      )
      .addCase(fetchExaminers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(
        fetchExaminerById.fulfilled,
        (state, action: PayloadAction<Examiner>) => {
          state.currentExaminer = action.payload;
        }
      )
      .addCase(
        fetchNominations.fulfilled,
        (state, action: PayloadAction<Nomination[]>) => {
          state.nominations = action.payload;
        }
      )
      .addCase(
        acceptNomination.fulfilled,
        (state, action: PayloadAction<Nomination>) => {
          const index = state.nominations.findIndex(
            (n) => n.id === action.payload.id
          );
          if (index !== -1) {
            state.nominations[index] = action.payload;
          }
        }
      )
      .addCase(
        rejectNomination.fulfilled,
        (state, action: PayloadAction<Nomination>) => {
          const index = state.nominations.findIndex(
            (n) => n.id === action.payload.id
          );
          if (index !== -1) {
            state.nominations[index] = action.payload;
          }
        }
      )
      .addCase(
        evaluateStudent.fulfilled,
        (state, action: PayloadAction<Viva>) => {
          const index = state.vivas.findIndex(
            (v) => v.id === action.payload.id
          );
          if (index !== -1) {
            state.vivas[index] = action.payload;
          }
        }
      )
      .addCase(
        fetchLecturers.fulfilled,
        (state, action: PayloadAction<Lecturer[]>) => {
          state.lecturers = action.payload;
        }
      )
      .addCase(
        fetchProjects.fulfilled,
        (state, action: PayloadAction<Project[]>) => {
          state.projects = action.payload;
        }
      )
      .addCase(
        fetchVivaDetails.fulfilled,
        (state, action: PayloadAction<Viva[]>) => {
          state.vivas = action.payload;
        }
      );
  },
});

export default examinerSlice.reducer;
