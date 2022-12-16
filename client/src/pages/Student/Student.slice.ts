import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResponseErrorType } from "../../api/api";
import { Student } from "../../types/student";

export interface StudentState {
  student: Student | null;
  studentForm: {
    name: string;
    info: string;
    contact: string;
    age: number;
  };
  errors: ResponseErrorType;
}

const initialState: StudentState = {
  student: null,
  studentForm: {
    name: "",
    info: "",
    contact: "",
    age: 0,
  },
  errors: {
    messages: [],
    fields: [],
  },
};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudent: (state, action: PayloadAction<Student>) => {
      state.student = action.payload;
      state.studentForm.name = action.payload.name;
      state.studentForm.info = action.payload.info;
      state.studentForm.contact = action.payload.contact;
      state.studentForm.age = action.payload.age;
    },
    updateName: (state, action: PayloadAction<string>) => {
      state.studentForm.name = action.payload;
      state.errors = {
        messages: [],
        fields: [],
      }
    },
    updateInfo: (state, action: PayloadAction<string>) => {
      state.studentForm.info = action.payload;
      state.errors = {
        messages: [],
        fields: [],
      }
    },
    updateAge: (state, action: PayloadAction<number>) => {
      state.studentForm.age = action.payload;
      state.errors = {
        messages: [],
        fields: [],
      }
    },
    updateContact: (state, action: PayloadAction<string>) => {
      state.studentForm.contact = action.payload;
      state.errors = {
        messages: [],
        fields: [],
      }
    },
    successUpdate: (state) => {
      state.errors = {
        messages: [],
        fields: [],
      };
    },
    failUpdate: (state, action: PayloadAction<ResponseErrorType>) => {
      state.errors = action.payload;
    },
    successDelete: (state) => {
      state.errors = {
        messages: [],
        fields: [],
      };
    },
    failDelete: (state, action: PayloadAction<ResponseErrorType>) => {
      state.errors = action.payload;
    }
  },
});

export const {
  setStudent,
  updateName,
  updateInfo,
  updateAge,
  updateContact,
  successUpdate,
  failUpdate,
  successDelete,
  failDelete,
} = studentSlice.actions;

export default studentSlice.reducer;
