import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import vivaReducer from "./viva/vivaSlice";
import examinerSlice from "./examiner/examinerSlice";
import studentSlice from "./student/studentSlice";
import fileUploadSlice from "./file-upload/fileUploadSlice";
import supervisorSlice from "./supervisor/supervisorSlice";
import lecturerSlice from "./lecturer/lecturerSlice";
import submissionSlice from "./submission/submissionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    examiner: examinerSlice,
    fileUpload: fileUploadSlice,
    lecturer: lecturerSlice,
    student: studentSlice,
    submission: submissionSlice,
    supervisor: supervisorSlice,
    viva: vivaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
