import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  user: {
    email: string;
    password: string;
  };
  loggingIn: boolean;
  loggedIn: boolean;
}

const initialState: LoginState = {
  user: {
    email: "",
    password: "",
  },
  loggingIn: false,
  loggedIn: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    startLoggingIn: (state: LoginState) => {
      state.loggingIn = true;
    },
    endLoggingIn: (state: LoginState) => {
      state.loggingIn = false;
    },
    successLoggingIn: (state: LoginState) => {
      state.loggedIn = true;
      state.loggingIn = false;
      state.user = {
        email: "",
        password: "",
      };
    },
    updateEmail: (state: LoginState, action: PayloadAction<string>) => {
      state.user.email = action.payload;
    },
    updatePassword: (state: LoginState, action: PayloadAction<string>) => {
      state.user.password = action.payload;
    },
  },
});

export const {
  startLoggingIn,
  endLoggingIn,
  successLoggingIn,
  updateEmail,
  updatePassword,
} = loginSlice.actions;

export default loginSlice.reducer;
