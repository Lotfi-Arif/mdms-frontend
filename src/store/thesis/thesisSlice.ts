import { Project, Submission } from "@lotfiarif-development/mdms-prisma-schema";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/utils/axiosConfig";

interface ThesisState {
  submissions: Submission[];
  projects: Project[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ThesisState = {
  submissions: [],
  projects: [],
  isLoading: false,
  error: null,
};

export const fetchSubmissions = createAsyncThunk(
  "thesis/fetchSubmissions",
  async (studentId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/submissions/${studentId}`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const createSubmission = createAsyncThunk(
  "thesis/createSubmission",
  async (submissionData: Partial<Submission>, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/submissions", submissionData);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchProjects = createAsyncThunk(
  "thesis/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/projects");
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const thesisSlice = createSlice({
  name: "thesis",
  initialState,
  reducers: {
    setSubmissions: (state, action: PayloadAction<Submission[]>) => {
      state.submissions = action.payload;
    },
    addSubmission: (state, action: PayloadAction<Submission>) => {
      state.submissions.push(action.payload);
    },
    updateSubmission: (state, action: PayloadAction<Submission>) => {
      const index = state.submissions.findIndex(
        (s) => s.id === action.payload.id
      );
      if (index !== -1) {
        state.submissions[index] = action.payload;
      }
    },
    deleteSubmission: (state, action: PayloadAction<string>) => {
      state.submissions = state.submissions.filter(
        (s) => s.id !== action.payload
      );
    },
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
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
      .addCase(fetchSubmissions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchSubmissions.fulfilled,
        (state, action: PayloadAction<Submission[]>) => {
          state.isLoading = false;
          state.submissions = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchSubmissions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(
        createSubmission.fulfilled,
        (state, action: PayloadAction<Submission>) => {
          state.submissions.push(action.payload);
        }
      )
      .addCase(
        fetchProjects.fulfilled,
        (state, action: PayloadAction<Project[]>) => {
          state.projects = action.payload;
        }
      );
  },
});

export const {
  setSubmissions,
  addSubmission,
  updateSubmission,
  deleteSubmission,
  setProjects,
  addProject,
  updateProject,
  deleteProject,
  setLoading,
  setError,
} = thesisSlice.actions;

export default thesisSlice.reducer;
