import { configureStore } from "@reduxjs/toolkit";

import app from "../components/App/App.slice";
import login from "../pages/Login/Login.slice";

export const store = configureStore({
  reducer: {app, login}
});

export type Store = ReturnType<typeof store.getState>;
