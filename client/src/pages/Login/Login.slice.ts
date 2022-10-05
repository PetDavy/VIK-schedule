import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResponseErrorType } from "../../api/api";

interface LoginState {
  user: {
    email: string;
    password: string;
  };
  errors: ResponseErrorType;
  loggingIn: boolean;
  googleLoggingIn: boolean;
  loggedIn: boolean;
}

const initialState: LoginState = {
  user: {
    email: "",
    password: "",
  },
  errors: {
    messages: [],
    fields: [],
  },
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
      state.errors = {
        messages: [],
        fields: [],
      };
    },
    failLoggingIn: (state: LoginState, action: PayloadAction<ResponseErrorType>) => {
      state.errors = action.payload;
    },
    updateEmail: (state: LoginState, action: PayloadAction<string>) => {
      state.user.email = action.payload;
      state.errors = {
        messages: [],
        fields: [],
      };
    },
    updatePassword: (state: LoginState, action: PayloadAction<string>) => {
      state.user.password = action.payload;
      state.errors = {
        messages: [],
        fields: [],
      };
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
