import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Student } from "../../types/student";

interface StudentsListState {
  students: Student[];
  isLoading: boolean;
}

const initialState: StudentsListState = {
  students: [],
  isLoading: false,
}

export const studentsListSlice = createSlice({
  name: "studentsList",
  initialState,
  reducers: {
    setStudents: (state: StudentsListState, action: PayloadAction<Student[]>) => {
      state.students = action.payload;
    },
    startLoad: (state: StudentsListState) => {
      state.isLoading = true;
    },
    endLoad: (state: StudentsListState) => {
      state.isLoading = false;
    }
  }
});

export const { setStudents, startLoad, endLoad } = studentsListSlice.actions;

export default studentsListSlice.reducer;