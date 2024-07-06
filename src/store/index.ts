import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import vivaReducer from './viva/vivaSlice';
import thesisSlice from './thesis/thesisSlice';
import examinerSlice from './examiner/examinerSlice';
import studentSlice from './student/studentSlice';
import fileUploadSlice from './file-upload/fileUploadSlice';
import supervisorSlice from './supervisor/supervisorSlice';
import lecturerSlice from './lecturer/lecturerSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    viva: vivaReducer,
    thesis: thesisSlice,
    examiner: examinerSlice,
    student: studentSlice,
    fileUpload: fileUploadSlice,
    supervisor: supervisorSlice,
    lecturer: lecturerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;