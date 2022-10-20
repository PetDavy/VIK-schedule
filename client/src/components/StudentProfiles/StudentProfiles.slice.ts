import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResponseErrorType } from "../../api/api";
import { StudentProfile } from "../../types/studentProfile";
import { ClassTime } from "../../types/classTime";

export interface StudentProfileForm {
  id: number | string;
  class_price: number;
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
    successUpdate: (state, action: PayloadAction<StudentProfile>) => {
      const updatedProfile = {
        id: action.payload.id,
        class_price: action.payload.class_price,
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
      });
      state.activeStudentProfile = action.payload;
      state.activeStudentProfileForm = {
        id: action.payload.id,
        class_price: action.payload.class_price,
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
  successUpdate,
  failUpdate,
  successCreate,
  failCreate,
} = studentProfilesSlice.actions;

export default studentProfilesSlice.reducer;
