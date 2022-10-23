import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResponseErrorType } from "../../api/api";
import { StudentProfile } from "../../types/studentProfile";
import { ScheduleDate } from "../../types/scheduleDate";

export interface StudentProfileForm {
  id: number | string;
  class_price: number;
  schedule_dates: ScheduleDate[];
  // todo: add flag if new student profile instead of string id
}

interface StudentProfilesState {
  studentProfiles: StudentProfile[];
  studentProfileForms: StudentProfileForm[];
  activeStudentProfile: StudentProfile | null;
  activeStudentProfileForm: StudentProfileForm;
  errors: ResponseErrorType;
}

const initialState: StudentProfilesState = {
  studentProfiles: [],
  studentProfileForms: [],
  activeStudentProfile: null,
  activeStudentProfileForm: {
    id: 0,
    class_price: 0,
    schedule_dates: [],
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
      action: PayloadAction<StudentProfile[]>
    ) => {
      state.studentProfiles = action.payload;
    },
    setStudentProfileForms: (
      state,
      action: PayloadAction<StudentProfile[]>
    ) => {
      state.studentProfileForms = action.payload.map(
        (profile) => {
          return {
            id: profile.id,
            class_price: profile.class_price,
            schedule_dates: profile.schedule_dates,
          };
        }
      );
    },
    setActiveStudentProfile: (state, action: PayloadAction<StudentProfile | null>) => {
      state.activeStudentProfile = action.payload;
    },
    setActiveStudentProfileForm: (
      state,
      action: PayloadAction<StudentProfileForm>
    ) => {
      state.activeStudentProfileForm.id = action.payload.id;
      state.activeStudentProfileForm.class_price = action.payload.class_price;
    },
    startNewProfile: (state) => {
      const newProfilesCount = state.studentProfileForms.filter((profile) =>
        String(profile.id).includes("new")
      ).length;
      const newProfile: StudentProfileForm = {
        id: `new-${newProfilesCount + 1}`,
        class_price: 0,
        schedule_dates: [],
      };

      state.studentProfileForms.push(newProfile);
      state.activeStudentProfileForm = newProfile;
      state.activeStudentProfile = null;
    },
    removeNewProfile: (state, action: PayloadAction<string>) => {
      state.studentProfileForms = state.studentProfileForms.filter(
        (profile) => profile.id !== action.payload
      );
    },
    updateClassPrice: (state, action: PayloadAction<number>) => {
      state.activeStudentProfileForm.class_price = action.payload;
      state.errors = {
        messages: [],
        fields: [],
      }
    },
    updateScheduleDates: (state, action: PayloadAction<ScheduleDate[]>) => {
      state.activeStudentProfileForm.schedule_dates = action.payload;
      state.activeStudentProfile!.schedule_dates = action.payload;

      const activeProfileIndex = state.studentProfileForms.findIndex(
        (profile) => profile.id === state.activeStudentProfileForm.id
      );
      const activeProfileFormIndex = state.studentProfileForms.findIndex(
        (profile) => profile.id === state.activeStudentProfileForm.id
      )
      state.studentProfileForms[activeProfileIndex] = state.activeStudentProfileForm;
      state.studentProfiles[activeProfileFormIndex] = state.activeStudentProfile!;
    },
    successUpdate: (state, action: PayloadAction<StudentProfile>) => {
      const updatedProfile = {
        id: action.payload.id,
        class_price: action.payload.class_price,
        schedule_dates: action.payload.schedule_dates,
      };
      const profileIndex = state.studentProfiles.findIndex(
        (profile) => profile.id === updatedProfile.id
      );
      const profileFormIndex = state.studentProfileForms.findIndex(
        (profile) => profile.id === updatedProfile.id
      )
      
      state.studentProfiles[profileIndex] = action.payload;
      state.studentProfileForms[profileFormIndex] = updatedProfile;
      state.activeStudentProfile = action.payload;
      state.activeStudentProfileForm = updatedProfile;
      state.errors = {
        messages: [],
        fields: [],
      };
    },
    failUpdate: (state, action: PayloadAction<ResponseErrorType>) => {
      state.errors = action.payload;
    },
    successCreate: (state, action: PayloadAction<StudentProfile>) => {
      state.studentProfiles.push(action.payload);
      state.studentProfileForms.push({
        id: action.payload.id,
        class_price: action.payload.class_price,
        schedule_dates: action.payload.schedule_dates,
      });
      state.activeStudentProfile = action.payload;
      state.activeStudentProfileForm = {
        id: action.payload.id,
        class_price: action.payload.class_price,
        schedule_dates: action.payload.schedule_dates,
      };
      state.errors = {
        messages: [],
        fields: [],
      };
    },
    failCreate: (state, action: PayloadAction<ResponseErrorType>) => {
      state.errors = action.payload;
    }
  },
});

export const {
  setStudentProfiles,
  setStudentProfileForms,
  setActiveStudentProfile,
  setActiveStudentProfileForm,
  startNewProfile,
  removeNewProfile,
  updateClassPrice,
  updateScheduleDates,
  successUpdate,
  failUpdate,
  successCreate,
  failCreate,
} = studentProfilesSlice.actions;

export default studentProfilesSlice.reducer;
