import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/utils/axiosConfig";
import { Submission } from "@lotfiarif-development/mdms-prisma-schema";

interface SubmissionState {
  submissions: Submission[];
  currentSubmission: Submission | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: SubmissionState = {
  submissions: [],
  currentSubmission: null,
  isLoading: false,
  error: null,
};

export const createSubmission = createAsyncThunk(
  "submission/createSubmission",
  async (
    submissionData: {
      title: string;
      submissionType: string;
      fileId: string;
      email: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/submissions", submissionData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSubmissions = createAsyncThunk(
  "submission/getSubmissions",
  async (studentId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/submissions/${studentId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const submissionSlice = createSlice({
  name: "submission",
  initialState,
  reducers: {
    clearSubmissionError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSubmission.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        createSubmission.fulfilled,
        (state, action: PayloadAction<Submission>) => {
          state.isLoading = false;
          state.submissions.push(action.payload);
          state.currentSubmission = action.payload;
        }
      )
      .addCase(createSubmission.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getSubmissions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getSubmissions.fulfilled,
        (state, action: PayloadAction<Submission[]>) => {
          state.isLoading = false;
          state.submissions = action.payload;
        }
      )
      .addCase(getSubmissions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSubmissionError } = submissionSlice.actions;
export default submissionSlice.reducer;
