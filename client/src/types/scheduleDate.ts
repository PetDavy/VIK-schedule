export type dayType = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

export interface ScheduleDate {
  id: number;
  student_profile_id: number;
  day: dayType;
  time: string;
  duration: number;
  created_at: string;
}

export interface CreateScheduleDate {
  time: string;
  duration: number;
}

export interface UpdateScheduleDate {
  time?: string;
  duration?: number;
}