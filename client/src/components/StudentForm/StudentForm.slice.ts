import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResponseErrorType } from "../../api/api";
import { Student } from "../../types/student";

interface StudentFormState {
  student: {
    name: string;
    age: number;
    info: string;
    contact: string;
  };
  creating: boolean;
  errors: ResponseErrorType;
  newStudents: Student[];
}

const initialState: StudentFormState = {
  student: {
    name: "",
    age: 2,
    info: "",
    contact: "",
  },
  creating: false,
  errors: {
    messages: [],
    fields: [],
  },
  newStudents: [],
};

export const studentsSlice = createSlice({
  name: "studentForm",
  initialState,
  reducers: {
    startCreating: (state: StudentFormState) => {
      state.creating = true;
    },
    endCreating: (state: StudentFormState) => {
      state.creating = false;
    },
    successCreate: (state: StudentFormState) => {
      state.creating = false;
      state.student = {
        name: "",
        age: 2,
        info: "",
        contact: "",
      };
      state.errors = {
        messages: [],
        fields: [],
      };
    },
    failCreate: (
      state: StudentFormState,
      action: PayloadAction<ResponseErrorType>
    ) => {
      state.creating = false;
      state.errors = action.payload;
    },
    updateName: (state: StudentFormState, action: PayloadAction<string>) => {
      state.student.name = action.payload;
      state.errors = {
        messages: [],
        fields: [],
      };
    },
    updateAge: (
      state: StudentFormState,
      action: PayloadAction<number>
    ) => {
      state.student.age = action.payload;
      state.errors = {
        messages: [],
        fields: [],
      };
    },
    updateInfo: (state: StudentFormState, action: PayloadAction<string>) => {
      state.student.info = action.payload;
      state.errors = {
        messages: [],
        fields: [],
      };
    },
    updateContact: (state: StudentFormState, action: PayloadAction<string>) => {
      state.student.contact = action.payload;
      state.errors = {
        messages: [],
        fields: [],
      };
    },
    addNewStudent: (
      state: StudentFormState,
      action: PayloadAction<Student>
    ) => {
      state.newStudents.push(action.payload);
    },
    removeNewStudent: (
      state: StudentFormState,
      action: PayloadAction<number>
    ) => {
      state.newStudents = state.newStudents.filter(
        (student) => student.id !== action.payload
      )
    }
  },
});

export const {
  startCreating,
  endCreating,
  successCreate,
  failCreate,
  updateName,
  updateAge,
  updateInfo,
  updateContact,
  addNewStudent,
  removeNewStudent,
} = studentsSlice.actions;

export default studentsSlice.reducer;
