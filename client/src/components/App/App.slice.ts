import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "../../types/user";

interface AppState {
  loading: boolean;
  user: User | null;
  isMenuOpen: boolean;
}

const initialState: AppState = {
  loading: true,
  user: null,
  isMenuOpen: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    loadUser: (state: AppState, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
    },
    logout: (state: AppState) => {
      state.user = null;
      state.loading = false;
    },
    endLoad: (state: AppState) => {
      state.loading = false;
    },
    openMenu: (state: AppState) => {
      state.isMenuOpen = true;
    },
    closeMenu: (state: AppState) => {
      state.isMenuOpen = false;
    },
  },
});

export const { loadUser, endLoad, logout, openMenu, closeMenu } =
  appSlice.actions;

export default appSlice.reducer;
