import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  user: {
    email: string;
    password: string;
  };
  errors: string[];
  loggingIn: boolean;
  googleLoggingIn: boolean;
  loggedIn: boolean;
}

const initialState: LoginState = {
  user: {
    email: "",
    password: "",
  },
  errors: [],
  loggingIn: false,
  googleLoggingIn: false,
  loggedIn: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    startLoggingIn: (state: LoginState) => {
      state.loggingIn = true;
    },
    startGoogleLoggingIn: (state: LoginState) => {
      state.googleLoggingIn = true;
    },
    endLoggingIn: (state: LoginState) => {
      state.loggingIn = false;
      state.googleLoggingIn = false;
    },
    successLoggingIn: (state: LoginState) => {
      state.loggedIn = true;
      state.user = {
        email: "",
        password: "",
      };
      state.errors = [];
    },
    failLoggingIn: (state: LoginState, action: PayloadAction<string[]>) => {
      state.errors = action.payload;
    },
    updateEmail: (state: LoginState, action: PayloadAction<string>) => {
      state.user.email = action.payload;
      state.errors = [];
    },
    updatePassword: (state: LoginState, action: PayloadAction<string>) => {
      state.user.password = action.payload;
      state.errors = [];
    },
  },
});

export const {
  startLoggingIn,
  startGoogleLoggingIn,
  endLoggingIn,
  successLoggingIn,
  failLoggingIn,
  updateEmail,
  updatePassword,
} = loginSlice.actions;

export default loginSlice.reducer;
