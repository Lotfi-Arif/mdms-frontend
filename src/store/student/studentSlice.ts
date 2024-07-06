import {
  Student,
  Submission,
  Viva,
  Project,
} from "@lotfiarif-development/mdms-prisma-schema";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/utils/axiosConfig";

interface StudentState {
  students: Student[];
  currentStudent: Student | null;
  submissions: Submission[];
  progress: number;
  viva: Viva | null;
  projects: Project[];
  isLoading: boolean;
  error: string | null;
}

const initialState: StudentState = {
  students: [],
  currentStudent: null,
  submissions: [],
  progress: 0,
  viva: null,
  projects: [],
  isLoading: false,
  error: null,
};

export const fetchStudents = createAsyncThunk(
  "student/fetchStudents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/students");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchStudentById = createAsyncThunk(
  "student/fetchStudentById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/students/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchStudentProgress = createAsyncThunk(
  "student/fetchStudentProgress",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/students/${id}/progress`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addSubmission = createAsyncThunk(
  "student/addSubmission",
  async (
    {
      studentId,
      title,
      content,
    }: { studentId: string; title: string; content: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(`/students/${studentId}/submissions`, {
        title,
        content,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchVivaDetails = createAsyncThunk(
  "student/fetchVivaDetails",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/students/${id}/viva-details`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProjects = createAsyncThunk(
  "student/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/students/projects");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchStudents.fulfilled,
        (state, action: PayloadAction<Student[]>) => {
          state.isLoading = false;
          state.students = action.payload;
        }
      )
      .addCase(fetchStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(
        fetchStudentById.fulfilled,
        (state, action: PayloadAction<Student>) => {
          state.currentStudent = action.payload;
        }
      )
      .addCase(
        fetchStudentProgress.fulfilled,
        (state, action: PayloadAction<{ progress: number }>) => {
          state.progress = action.payload.progress;
        }
      )
      .addCase(
        addSubmission.fulfilled,
        (state, action: PayloadAction<Submission>) => {
          state.submissions.push(action.payload);
        }
      )
      .addCase(
        fetchVivaDetails.fulfilled,
        (state, action: PayloadAction<Viva>) => {
          state.viva = action.payload;
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

export default studentSlice.reducer;
