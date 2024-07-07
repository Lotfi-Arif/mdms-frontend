import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/utils/axiosConfig";
import {
  Lecturer,
  Student,
  Supervisor,
  Examiner,
  Nomination,
  User,
} from "@lotfiarif-development/mdms-prisma-schema";

interface FulluserWithLecturer extends User {
  lecturer: Lecturer & {
    supervisor?: Supervisor & {
      id: string;
      assignedStudents: (Student & {
        user: User;
      })[];
    };
    examiner?: Examiner;
  };
}

interface LecturerState {
  lecturers: FulluserWithLecturer[];
  currentLecturer: FulluserWithLecturer | null;
  nominations: Nomination[];
  isLoading: boolean;
  error: string | null;
}

const initialState: LecturerState = {
  lecturers: [],
  currentLecturer: null,
  nominations: [],
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
        (state, action: PayloadAction<FulluserWithLecturer[]>) => {
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
        (state, action: PayloadAction<FulluserWithLecturer>) => {
          state.currentLecturer = action.payload;
        }
      )
      .addCase(
        makeLecturerSupervisor.fulfilled,
        (state, action: PayloadAction<FulluserWithLecturer>) => {
          if (state.currentLecturer) {
            state.currentLecturer.lecturer.supervisor =
              action.payload.lecturer.supervisor;
          }
        }
      )
      .addCase(
        makeLecturerExaminer.fulfilled,
        (state, action: PayloadAction<FulluserWithLecturer>) => {
          if (state.currentLecturer) {
            state.currentLecturer.lecturer.examiner =
              action.payload.lecturer.examiner;
          }
        }
      );
  },
});

export default lecturerSlice.reducer;
