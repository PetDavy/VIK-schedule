import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Student } from "../../types/student";

interface StudentsListState {
  students: Student[];
}

const initialState: StudentsListState = {
  students: [],
}

export const studentsListSlice = createSlice({
  name: "studentsList",
  initialState,
  reducers: {
    setStudents: (state, action: PayloadAction<Student[]>) => {
      state.students = action.payload;
    }
  }
});

export const { setStudents } = studentsListSlice.actions;

export default studentsListSlice.reducer;