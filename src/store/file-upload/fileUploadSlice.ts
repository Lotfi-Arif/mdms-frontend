import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/utils/axiosConfig";
import { File } from "@lotfiarif-development/mdms-prisma-schema";

interface FileUploadState {
  files: File[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FileUploadState = {
  files: [],
  isLoading: false,
  error: null,
};

export const uploadFile = createAsyncThunk(
  "fileUpload/uploadFile",
  async (file: FormData, { rejectWithValue }) => {
    try {
      const response = await api.post("/files/upload", file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const uploadMultipleFiles = createAsyncThunk(
  "fileUpload/uploadMultipleFiles",
  async (files: FormData, { rejectWithValue }) => {
    try {
      const response = await api.post("/files/uploads", files, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getFile = createAsyncThunk(
  "fileUpload/getFile",
  async (fileId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/files/${fileId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadFile.fulfilled, (state, action: PayloadAction<File>) => {
        state.isLoading = false;
        state.files.push(action.payload);
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(uploadMultipleFiles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        uploadMultipleFiles.fulfilled,
        (state, action: PayloadAction<File[]>) => {
          state.isLoading = false;
          state.files = [...state.files, ...action.payload];
        }
      )
      .addCase(uploadMultipleFiles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getFile.fulfilled, (state, action: PayloadAction<File>) => {
        const index = state.files.findIndex((f) => f.id === action.payload.id);
        if (index !== -1) {
          state.files[index] = action.payload;
        } else {
          state.files.push(action.payload);
        }
      });
  },
});

export default fileUploadSlice.reducer;
