import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    email: '',
    password: '',
  },
  loggingIn: false,
  loggedIn: false,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    updateEmail: (state: LoginState, action: PayloadAction<string>) => {
      state.user.email = action.payload;
    },
    updatePassword: (state: LoginState, action: PayloadAction<string>) => {
      state.user.password = action.payload;
    }
  }
});

export const { updateEmail, updatePassword } = loginSlice.actions;

export default loginSlice.reducer;