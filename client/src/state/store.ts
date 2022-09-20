import { configureStore } from "@reduxjs/toolkit";

import app from "../components/App/App.slice";
import login from "../pages/Login/Login.slice";
import register from "../pages/Register/Register.slice";
import studentsList from "../components/StudentsList/StudentsList.slice";

export const store = configureStore({
  reducer: {app, login, register, studentsList},
});

export type Store = ReturnType<typeof store.getState>;
