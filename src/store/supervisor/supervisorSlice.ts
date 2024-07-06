import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/utils/axiosConfig";
import {
  Supervisor,
  Student,
  Submission,
  Project,
  Viva,
  Lecturer,
} from "@lotfiarif-development/mdms-prisma-schema";

interface SupervisorState {
  supervisors: Supervisor[];
  currentSupervisor: Supervisor | null;
  assignedStudents: Student[];
  submissions: Submission[];
  projects: Project[];
  vivas: Viva[];
  lecturers: Lecturer[];
  isLoading: boolean;
  error: string | null;
}

const initialState: SupervisorState = {
  supervisors: [],
  currentSupervisor: null,
  assignedStudents: [],
  submissions: [],
  projects: [],
  vivas: [],
  lecturers: [],
  isLoading: false,
  error: null,
};

export const fetchSupervisors = createAsyncThunk(
  "supervisor/fetchSupervisors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/supervisors");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSupervisorById = createAsyncThunk(
  "supervisor/fetchSupervisorById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/supervisors/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAssignedStudents = createAsyncThunk(
  "supervisor/fetchAssignedStudents",
  async (supervisorId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/supervisors/${supervisorId}/students`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchStudentSubmissions = createAsyncThunk(
  "supervisor/fetchStudentSubmissions",
  async (studentId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/supervisors/submissions/${studentId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const nominateExaminer = createAsyncThunk(
  "supervisor/nominateExaminer",
  async (
    { examinerId, details }: { examinerId: string; details: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(`/supervisors/${examinerId}/nominate`, {
        details,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchLecturers = createAsyncThunk(
  "supervisor/fetchLecturers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/supervisors/lecturers");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProjectArchive = createAsyncThunk(
  "supervisor/fetchProjectArchive",
  async (supervisorId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/supervisors/${supervisorId}/projects/archive`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAssignedVivas = createAsyncThunk(
  "supervisor/fetchAssignedVivas",
  async (supervisorId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/supervisors/${supervisorId}/vivas`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const supervisorSlice = createSlice({
  name: "supervisor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupervisors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchSupervisors.fulfilled,
        (state, action: PayloadAction<Supervisor[]>) => {
          state.isLoading = false;
          state.supervisors = action.payload;
        }
      )
      .addCase(fetchSupervisors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(
        fetchSupervisorById.fulfilled,
        (state, action: PayloadAction<Supervisor>) => {
          state.currentSupervisor = action.payload;
        }
      )
      .addCase(
        fetchAssignedStudents.fulfilled,
        (state, action: PayloadAction<Student[]>) => {
          state.assignedStudents = action.payload;
        }
      )
      .addCase(
        fetchStudentSubmissions.fulfilled,
        (state, action: PayloadAction<Submission[]>) => {
          state.submissions = action.payload;
        }
      )
      .addCase(
        fetchLecturers.fulfilled,
        (state, action: PayloadAction<Lecturer[]>) => {
          state.lecturers = action.payload;
        }
      )
      .addCase(
        fetchProjectArchive.fulfilled,
        (state, action: PayloadAction<Project[]>) => {
          state.projects = action.payload;
        }
      )
      .addCase(
        fetchAssignedVivas.fulfilled,
        (state, action: PayloadAction<Viva[]>) => {
          state.vivas = action.payload;
        }
      );
  },
});

export default supervisorSlice.reducer;
