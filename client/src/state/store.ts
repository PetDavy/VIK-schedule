import { configureStore } from "@reduxjs/toolkit";

import app from "../components/App/App.slice";
import login from "../pages/Login/Login.slice";
import register from "../pages/Register/Register.slice";
import profile from "../pages/Profile/Profile.slice";
import studentsList from "../components/StudentsList/StudentsList.slice";

export const store = configureStore({
  reducer: {app, login, register, profile, studentsList},
});

export type Store = ReturnType<typeof store.getState>;
