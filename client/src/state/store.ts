import { configureStore } from "@reduxjs/toolkit";

import app from "../components/App/App.slice";
import login from "../pages/Login/Login.slice";
import register from "../pages/Register/Register.slice";
import profile from "../pages/Profile/Profile.slice";
import studentsList from "../components/StudentsList/StudentsList.slice";
import studentForm from "../components/StudentForm/StudentForm.slice";
import student from "../pages/Student/Student.slice";
import studentProfiles from "../components/StudentProfiles/StudentProfiles.slice";

export const store = configureStore({
  reducer: {
    app,
    login,
    register,
    profile,
    studentsList,
    studentForm,
    student,
    studentProfiles,
  },
});

export type Store = ReturnType<typeof store.getState>;
