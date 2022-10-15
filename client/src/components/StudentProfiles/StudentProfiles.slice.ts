import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResponseErrorType } from "../../api/api";
import { StudentProfile } from "../../types/studentProfile";
import { ClassTime } from "../../types/classTime";

export interface StudentProfileForm {
  id?: number | string;
  student_id?: number;
  class_price: number;
  class_time: ClassTime;
}

interface StudentProfilesState {
  studentProfiles: StudentProfileForm[];
  activeStudentProfile: StudentProfileForm;
}

const initialState: StudentProfilesState = {
  studentProfiles: [],
  activeStudentProfile: {
    class_price: 0,
    class_time: {
      day: '',
      start_time: '',
      end_time: '',
    }
  },
}

export const studentProfilesSlice = createSlice({
  name: "studentProfiles",
  initialState,
  reducers: {
    setStudentProfiles: (state, action: PayloadAction<StudentProfileForm[]>) => {
      state.studentProfiles = action.payload;
    },
    setActiveStudentProfile: (state, action: PayloadAction<StudentProfileForm>) => {
      state.activeStudentProfile.id = action.payload.id;
      state.activeStudentProfile.class_price = action.payload.class_price;
      state.activeStudentProfile.class_time = action.payload.class_time;
    },
    startNewProfile: (state) => {
      const newProfilesCount = state.studentProfiles.filter(profile => String(profile.id).includes('new')).length;
      const newProfile: StudentProfileForm = {
        id: `new-${newProfilesCount + 1}`,
        class_price: 0,
        class_time: {
          day: '',
          start_time: '',
          end_time: '',
        }
      };

      state.studentProfiles.push(newProfile);
      state.activeStudentProfile = newProfile;
    }
  }
});

export const { setStudentProfiles, setActiveStudentProfile, startNewProfile } = studentProfilesSlice.actions;

export default studentProfilesSlice.reducer;