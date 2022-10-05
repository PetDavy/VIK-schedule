import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResponseErrorType } from "../../api/api";

interface RegisterState {
  user: {
    username: string;
    email: string;
    password: string;
  };
  errors: ResponseErrorType;
  registering: boolean;
}

const initialState: RegisterState = {
  user: {
    username: '',
    email: '',
    password: '',
  },
  errors: {
    messages: [],
    fields: []
  },
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
      state.errors = {
        messages: [],
        fields: [],
      };
    }),
    failRegister: ((state: RegisterState, action: PayloadAction<ResponseErrorType>) => {
      state.registering = false;
      state.errors = action.payload;
    }),
    updateUsername: ((state: RegisterState, action: PayloadAction<string>) => {
      state.user.username = action.payload;
      state.errors = {
        messages: [],
        fields: [],
      };
    }),
    updateEmail: ((state: RegisterState, action: PayloadAction<string>) => {
      state.user.email = action.payload;
      state.errors = {
        messages: [],
        fields: [],
      };
    }),
    updatePassword: ((state: RegisterState, action: PayloadAction<string>) => {
      state.user.password = action.payload;
      state.errors = {
        messages: [],
        fields: [],
      };
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