import {
  Student,
  Submission,
  Viva,
  Project,
  User,
} from "@lotfiarif-development/mdms-prisma-schema";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/utils/axiosConfig";

interface FullUserWithStudent extends User {
  student: Student & {
    project: Project;
    submissions: Submission[];
    viva?: Viva;
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
        (state, action: PayloadAction<FullUserWithStudent[]>) => {
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
        (state, action: PayloadAction<FullUserWithStudent>) => {
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
          state.currentStudent?.student.submissions.push(action.payload);
        }
      );
    // TODO: Uncomment the following lines after understanding the structure of the state
    // .addCase(
    //   fetchVivaDetails.fulfilled,
    //   (state, action: PayloadAction<Viva>) => {
    //     state.currentStudent?.student.viva = action.payload;
    //   }
    // )
    // .addCase(
    //   fetchProjects.fulfilled,
    //   (state, action: PayloadAction<Project[]>) => {
    //     state.students = action.payload;
    //   }
    // );
  },
});

export default studentSlice.reducer;
