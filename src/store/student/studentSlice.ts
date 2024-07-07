import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/utils/axiosConfig";
import {
  Student,
  Submission,
  Viva,
  Project,
  User,
  Supervisor,
} from "@lotfiarif-development/mdms-prisma-schema";

interface FullUserWithStudent extends User {
  student: Student & {
    project: Project;
    submissions: Submission[];
    viva?: Viva;
    supervisor?: User & { lecturer: { supervisor: Supervisor } };
  };
}

interface StudentState {
  students: FullUserWithStudent[];
  progress: number;
  currentStudent: FullUserWithStudent | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: StudentState = {
  students: [],
  progress: 0,
  currentStudent: null,
  isLoading: false,
  error: null,
};

export const fetchStudentByEmail = createAsyncThunk(
  "student/fetchStudentByEmail",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/students/${email}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchStudentProgress = createAsyncThunk(
  "student/fetchStudentProgress",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/students/${email}/progress`);
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
      email,
      title,
      submissionType,
      fileId,
    }: {
      email: string;
      title: string;
      submissionType: string;
      fileId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(`/students/${email}/submissions`, {
        email,
        title,
        submissionType,
        fileId,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentByEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchStudentByEmail.fulfilled,
        (state, action: PayloadAction<FullUserWithStudent>) => {
          state.isLoading = false;
          state.currentStudent = action.payload;
        }
      )
      .addCase(fetchStudentByEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchStudentProgress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchStudentProgress.fulfilled,
        (state, action: PayloadAction<{ progress: number }>) => {
          state.isLoading = false;
          state.progress = action.payload.progress;
        }
      )
      .addCase(fetchStudentProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(addSubmission.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        addSubmission.fulfilled,
        (state, action: PayloadAction<Submission>) => {
          state.isLoading = false;
          if (state.currentStudent) {
            state.currentStudent.student.submissions.push(action.payload);
          }
        }
      )
      .addCase(addSubmission.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = studentSlice.actions;
export default studentSlice.reducer;
