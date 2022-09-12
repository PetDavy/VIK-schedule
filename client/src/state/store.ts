import { configureStore } from "@reduxjs/toolkit";

import app from "../components/App/App.slice";

export const store = configureStore({
  reducer: {app}
});

export type Store = ReturnType<typeof store.getState>;
