import { ScheduleDate } from "./scheduleDate";

export interface StudentProfile {
  id: number;
  student_id: number;
  class_price: number;
  created_at: string;
  schedule_dates: ScheduleDate[];
}

export interface UpdateStudentProfile {
  id: number;
  class_price?: number;
}

export interface CreateStudentProfile {
  id: string | number;
  class_price: number;
}