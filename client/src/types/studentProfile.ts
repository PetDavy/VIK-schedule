import { ClassTime } from "./classTime";

export interface StudentProfile {
  id: number;
  student_id: number;
  class_price: number;
  created_at: string;
  class_time: ClassTime;
}