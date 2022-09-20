import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegisterState {
  user: {
    username: string;
    email: string;
    password: string;
  };
  errors: string[];
  registering: boolean;
}

const initialState: RegisterState = {
  user: {
    username: '',
    email: '',
    password: '',
  },
  errors: [],
  registering: false,
}

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    startRegistering: ((state: RegisterState) => {
      state.registering = true;
    }),
    endRegistering: ((state: RegisterState) => {
      state.registering = false;
    }),
    successRegister: ((state: RegisterState) => {
      state.registering = false;
      state.user = {
        username: '',
        email: '',
        password: '',
      };
      state.errors = [];
    }),
    failRegister: ((state: RegisterState, action: PayloadAction<string[]>) => {
      state.registering = false;
      state.errors = action.payload;
    }),
    updateUsername: ((state: RegisterState, action: PayloadAction<string>) => {
      state.user.username = action.payload
    }),
    updateEmail: ((state: RegisterState, action: PayloadAction<string>) => {
      state.user.email = action.payload;
    }),
    updatePassword: ((state: RegisterState, action: PayloadAction<string>) => {
      state.user.password = action.payload;
    })
  }
});

export const {
  startRegistering,
  endRegistering,
  successRegister,
  failRegister,
  updateUsername,
  updateEmail,
  updatePassword
} = registerSlice.actions;

export default registerSlice.reducer;