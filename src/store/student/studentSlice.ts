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
    progress1Date: string;
    progress1Completed: boolean;
    progress2Date: string;
    progress2Completed: boolean;
    finalReportDate: string;
    finalReportCompleted: boolean;
    presentationDate: string;
    presentationCompleted: boolean;
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

export const fetchStudentByEmail = createAsyncThunk(
  "student/fetchStudentById",
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
        (state, action: PayloadAction<FullUserWithStudent[]>) => {
          state.isLoading = false;
          state.students = action.payload;
        }
      )
      .addCase(fetchStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchStudentByEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchStudentByEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(
        fetchStudentByEmail.fulfilled,
        (state, action: PayloadAction<FullUserWithStudent>) => {
          state.currentStudent = action.payload;
        }
      )
      .addCase(fetchStudentProgress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchStudentProgress.fulfilled,
        (state, action: PayloadAction<{ progress: number }>) => {
          state.progress = action.payload.progress;
        }
      )
      .addCase(
        addSubmission.fulfilled,
        (state, action: PayloadAction<Submission>) => {
          state.currentStudent?.student.submissions.push(action.payload);
        }
      );
  },
});

export default studentSlice.reducer;
