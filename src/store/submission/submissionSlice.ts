import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/utils/axiosConfig";
import { Submission } from "@prisma/client";

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

export const fetchSubmissions = createAsyncThunk(
  "submission/fetchSubmissions",
  async (studentId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/students/${studentId}/submissions`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createSubmission = createAsyncThunk(
  "submission/createSubmission",
  async (submissionData: Partial<Submission>, { rejectWithValue }) => {
    try {
      const response = await api.post("/submissions", submissionData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const submissionSlice = createSlice({
  name: "submission",
  initialState,
  reducers: {},
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
      );
  },
});

export default submissionSlice.reducer;
