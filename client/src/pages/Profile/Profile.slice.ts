import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResponseErrorType } from "../../api/api";
import { User } from "../../types/user";

interface ProfileState {
  profile: {
    username: string;
    email: string;
    picture: string;
    password: string;
    new_password: string;
  }
  errors: ResponseErrorType;
  updating: boolean;
};

const initialState: ProfileState = {
  profile: {
    username: '',
    email: '',
    picture: '',
    password: '',
    new_password: '',
  },
  errors: {
    messages: [],
    fields: []
  },
  updating: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    initSetup: ((state: ProfileState, action: PayloadAction<User>) => {
      state.profile.username = action.payload.username;
      state.profile.email = action.payload.email;
      if (action.payload.picture) {
        state.profile.picture = action.payload.picture;
      }
    }),
    startUpdating: ((state: ProfileState) => {
      state.updating = true;
    }),
    endUpdating: ((state: ProfileState) => {
      state.updating = false;
    }),
    successUpdate: ((state: ProfileState) => {
      state.updating = false;
      state.profile.password = '';
      state.profile.new_password = '';
      state.errors = {
        messages: [],
        fields: [],
      };
    }),
    failUpdate: ((state: ProfileState, action: PayloadAction<ResponseErrorType>) => {
      state.updating = false;
      state.errors = action.payload;
    }),
    updateUsername: ((state: ProfileState, action: PayloadAction<string>) => {
      state.profile.username = action.payload;
      state.errors = {
        messages: [],
        fields: [],
      };
    }),
    updateEmail: ((state: ProfileState, action: PayloadAction<string>) => {
      state.profile.email = action.payload;
      state.errors = {
        messages: [],
        fields: [],
      };
    }),
    updatePicture: ((state: ProfileState, action: PayloadAction<string>) => {
      state.profile.picture = action.payload;
      state.errors = {
        messages: [],
        fields: [],
      };
    }),
    updatePassword: ((state: ProfileState, action: PayloadAction<string>) => {
      state.profile.password = action.payload;
      state.errors = {
        messages: [],
        fields: [],
      };
    }),
    updateNewPassword: ((state: ProfileState, action: PayloadAction<string>) => {
      state.profile.new_password = action.payload;
      state.errors = {
        messages: [],
        fields: [],
      };
    })
  }
});

export const {
  initSetup,
  startUpdating,
  endUpdating,
  successUpdate,
  failUpdate,
  updateUsername,
  updateEmail,
  updatePicture,
  updatePassword,
  updateNewPassword,
} = profileSlice.actions;

export default profileSlice.reducer;