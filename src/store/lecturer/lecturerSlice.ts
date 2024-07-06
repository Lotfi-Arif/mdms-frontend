import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/utils/axiosConfig";
import {
  Lecturer,
  Student,
  Supervisor,
  Examiner,
} from "@lotfiarif-development/mdms-prisma-schema";

interface LecturerState {
  lecturers: Lecturer[];
  currentLecturer:
    | (Lecturer & {
        supervisor?: Supervisor;
        examiner?: Examiner;
      })
    | null;
  supervisorRole: Supervisor | null;
  examinerRole: Examiner | null;
  assignedStudents: Student[];
  isLoading: boolean;
  error: string | null;
}

const initialState: LecturerState = {
  lecturers: [],
  currentLecturer: null,
  supervisorRole: null,
  examinerRole: null,
  assignedStudents: [],
  isLoading: false,
  error: null,
};

export const fetchLecturers = createAsyncThunk(
  "lecturer/fetchLecturers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/lecturers");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchLecturerById = createAsyncThunk(
  "lecturer/fetchLecturerById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/lecturers/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const makeLecturerSupervisor = createAsyncThunk(
  "lecturer/makeLecturerSupervisor",
  async (lecturerId: string, { rejectWithValue }) => {
    try {
      const response = await api.post(`/supervisors/${lecturerId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const makeLecturerExaminer = createAsyncThunk(
  "lecturer/makeLecturerExaminer",
  async (lecturerId: string, { rejectWithValue }) => {
    try {
      const response = await api.post(`/examiners/${lecturerId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAssignedStudents = createAsyncThunk(
  "lecturer/fetchAssignedStudents",
  async (lecturerId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/lecturers/${lecturerId}/students`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const lecturerSlice = createSlice({
  name: "lecturer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLecturers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchLecturers.fulfilled,
        (state, action: PayloadAction<Lecturer[]>) => {
          state.isLoading = false;
          state.lecturers = action.payload;
        }
      )
      .addCase(fetchLecturers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(
        fetchLecturerById.fulfilled,
        (
          state,
          action: PayloadAction<
            Lecturer & {
              supervisor?: Supervisor;
              examiner?: Examiner;
            }
          >
        ) => {
          state.currentLecturer = action.payload;
          state.supervisorRole = action.payload.supervisor || null;
          state.examinerRole = action.payload.examiner || null;
        }
      )
      .addCase(
        makeLecturerSupervisor.fulfilled,
        (
          state,
          action: PayloadAction<
            Lecturer & {
              supervisor?: Supervisor;
              examiner?: Examiner;
            }
          >
        ) => {
          state.supervisorRole = action.payload;
          if (state.currentLecturer) {
            state.currentLecturer.supervisor = action.payload;
          }
        }
      )
      .addCase(
        makeLecturerExaminer.fulfilled,
        (
          state,
          action: PayloadAction<
            Lecturer & {
              supervisor: Supervisor | null;
              examiner: Examiner | null;
            }
          >
        ) => {
          state.examinerRole = action.payload.examiner;
          if (state.currentLecturer) {
            state.currentLecturer.examiner = action.payload.examiner;
          }
        }
      )
      .addCase(
        fetchAssignedStudents.fulfilled,
        (state, action: PayloadAction<Student[]>) => {
          state.assignedStudents = action.payload;
        }
      );
  },
});

export default lecturerSlice.reducer;
