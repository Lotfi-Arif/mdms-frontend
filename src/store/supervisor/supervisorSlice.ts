import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/utils/axiosConfig";
import {
  Supervisor,
  Lecturer,
  Student,
  User,
  Submission,
  Viva,
  Project,
} from "@prisma/client";

interface FullUserWithSupervisor extends User {
  supervisor: Supervisor & {
    lecturer: Lecturer & {
      user: User;
    };
    students: (Student & {
      user: User;
      submissions: Submission[];
      viva?: Viva;
      project?: Project;
    })[];
  };
}

interface SupervisorState {
  currentSupervisor: FullUserWithSupervisor | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: SupervisorState = {
  currentSupervisor: null,
  isLoading: false,
  error: null,
};

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

export const fetchSupervisedStudents = createAsyncThunk(
  "supervisor/fetchSupervisedStudents",
  async (supervisorId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/supervisors/${supervisorId}/students`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const reviewSubmission = createAsyncThunk(
  "supervisor/reviewSubmission",
  async (
    { submissionId, feedback }: { submissionId: string; feedback: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(`/submissions/${submissionId}/review`, {
        feedback,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const nominateExaminer = createAsyncThunk(
  "supervisor/nominateExaminer",
  async (
    { lecturerId, vivaId }: { lecturerId: string; vivaId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(`/supervisors/nominate-examiner`, {
        lecturerId,
        vivaId,
      });
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
      .addCase(fetchSupervisorById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchSupervisorById.fulfilled,
        (state, action: PayloadAction<FullUserWithSupervisor>) => {
          state.isLoading = false;
          state.currentSupervisor = action.payload;
        }
      )
      .addCase(fetchSupervisorById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(
        fetchSupervisedStudents.fulfilled,
        (state, action: PayloadAction<FullUserWithSupervisor>) => {
          if (state.currentSupervisor) {
            state.currentSupervisor.supervisor.students =
              action.payload.supervisor.students;
          }
        }
      )
      .addCase(
        reviewSubmission.fulfilled,
        (state, action: PayloadAction<Submission>) => {
          if (state.currentSupervisor) {
            state.currentSupervisor.supervisor.students =
              state.currentSupervisor.supervisor.students.map((student) => ({
                ...student,
                submissions: student.submissions.map((sub) =>
                  sub.id === action.payload.id ? action.payload : sub
                ),
              }));
          }
        }
      )
      .addCase(
        nominateExaminer.fulfilled,
        (state, action: PayloadAction<Viva>) => {
          if (state.currentSupervisor) {
            state.currentSupervisor.supervisor.students =
              state.currentSupervisor.supervisor.students.map((student) =>
                student.id === action.payload.studentId
                  ? { ...student, viva: action.payload }
                  : student
              );
          }
        }
      );
  },
});

export default supervisorSlice.reducer;
