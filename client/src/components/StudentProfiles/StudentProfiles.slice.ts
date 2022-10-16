import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResponseErrorType } from "../../api/api";
import { StudentProfile } from "../../types/studentProfile";
import { ClassTime } from "../../types/classTime";

export interface StudentProfileForm {
  id: number | string;
  class_price: number;
  class_time: ClassTime;
  // todo: add flag if new student profile instead of string id
}

interface StudentProfilesState {
  studentProfiles: StudentProfileForm[];
  activeStudentProfile: StudentProfileForm;
  errors: ResponseErrorType;
}

const initialState: StudentProfilesState = {
  studentProfiles: [],
  activeStudentProfile: {
    id: 0,
    class_price: 0,
    class_time: {
      day: "",
      start_time: "",
      end_time: "",
    },
  },
  errors: {
    messages: [],
    fields: [],
  },
};

export const studentProfilesSlice = createSlice({
  name: "studentProfiles",
  initialState,
  reducers: {
    setStudentProfiles: (
      state,
      action: PayloadAction<StudentProfileForm[]>
    ) => {
      state.studentProfiles = action.payload;
    },
    setActiveStudentProfile: (
      state,
      action: PayloadAction<StudentProfile>
    ) => {
      state.activeStudentProfile.id = action.payload.id;
      state.activeStudentProfile.class_price = action.payload.class_price;
      state.activeStudentProfile.class_time = action.payload.class_time;
    },
    startNewProfile: (state) => {
      const newProfilesCount = state.studentProfiles.filter((profile) =>
        String(profile.id).includes("new")
      ).length;
      const newProfile: StudentProfileForm = {
        id: `new-${newProfilesCount + 1}`,
        class_price: 0,
        class_time: {
          day: "",
          start_time: "",
          end_time: "",
        },
      };

      state.studentProfiles.push(newProfile);
      state.activeStudentProfile = newProfile;
    },
    updateClassPrice: (state, action: PayloadAction<number>) => {
      state.activeStudentProfile.class_price = action.payload;
      state.errors = {
        messages: [],
        fields: [],
      }
    },
    successUpdate: (state, action: PayloadAction<StudentProfile>) => {
      const updatedProfile = {
        id: action.payload.id,
        class_price: action.payload.class_price,
        class_time: action.payload.class_time,
      };
      const profileIndex = state.studentProfiles.findIndex(
        (profile) => profile.id === updatedProfile.id
      );
      
      state.studentProfiles[profileIndex] = updatedProfile;
      state.activeStudentProfile = updatedProfile;
      state.errors = {
        messages: [],
        fields: [],
      };
    },
    failUpdate: (state, action: PayloadAction<ResponseErrorType>) => {
      state.errors = action.payload;
    },
  },
});

export const {
  setStudentProfiles,
  setActiveStudentProfile,
  startNewProfile,
  updateClassPrice,
  successUpdate,
  failUpdate,
} = studentProfilesSlice.actions;

export default studentProfilesSlice.reducer;
