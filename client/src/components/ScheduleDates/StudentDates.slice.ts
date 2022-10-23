import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResponseErrorType } from "../../api/api";
import { ScheduleDate } from "../../types/scheduleDate";
import { dayType } from "../../types/scheduleDate";

interface ScheduleDatesState {
  days: {
    sun: ScheduleDate | null;
    mon: ScheduleDate | null;
    tue: ScheduleDate | null;
    wed: ScheduleDate | null;
    thu: ScheduleDate | null;
    fri: ScheduleDate | null;
    sat: ScheduleDate | null;
  };
  openedDay: ScheduleDate | null;
  errors: ResponseErrorType;
}

const initialState: ScheduleDatesState = {
  days: {
    sun: null,
    mon: null,
    tue: null,
    wed: null,
    thu: null,
    fri: null,
    sat: null,
  },
  openedDay: null,
  errors: {
    messages: [],
    fields: [],
  },
};

export const scheduleDatesSlice = createSlice({
  name: "scheduleDates",
  initialState,
  reducers: {
    clearScheduleDates: (state) => {
      state.days = {
        sun: null,
        mon: null,
        tue: null,
        wed: null,
        thu: null,
        fri: null,
        sat: null,
      };
      state.openedDay = null;
    },
    clearErrors: (state) => {
      state.errors = {
        messages: [],
        fields: [],
      };
    },
    setScheduleDates: (state, action: PayloadAction<ScheduleDate[]>) => {
      scheduleDatesSlice.caseReducers.clearScheduleDates(state);
      scheduleDatesSlice.caseReducers.clearErrors(state);

      action.payload.forEach((date) => {
        state.days[date.day] = date;
      });
    },
    setDay: (state, action: PayloadAction<ScheduleDate>) => {
      state.days[action.payload.day] = action.payload;
      state.openedDay = action.payload;
    },
    deleteDay: (state, action: PayloadAction<dayType>) => {
      state.days[action.payload] = null;
    },
    setOpenedDay: (state, action: PayloadAction<ScheduleDate | null>) => {
      state.openedDay = action.payload;
    },
    setClassTime: (state, action: PayloadAction<string>) => {
      if (state.openedDay) {
        state.openedDay.time = action.payload;
      }

      const { day } = state.openedDay as ScheduleDate;

      if (state.days[day]) {
        state.days[day]!.time = action.payload;
      }
    },
    setClassDuration: (state, action: PayloadAction<number>) => {
      if (state.openedDay) {
        state.openedDay.duration = action.payload;
      }

      const { day } = state.openedDay as ScheduleDate;

      if (state.days[day]) {
        state.days[day]!.duration = action.payload;
      }
    },
    addDay: (state) => {
      if (!state.openedDay) {
        return;
      }

      state.days[state.openedDay.day] = state.openedDay;
    },
    setErrors: (state, action: PayloadAction<ResponseErrorType>) => {
      state.errors = action.payload;
    },
  },
});

export const {
  setScheduleDates,
  setDay,
  setOpenedDay,
  setClassTime,
  setClassDuration,
  addDay,
  deleteDay,
  clearScheduleDates,
} = scheduleDatesSlice.actions;

export default scheduleDatesSlice.reducer;
