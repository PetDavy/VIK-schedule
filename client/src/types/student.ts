import { StudentProfile } from "./studentProfile";

export interface Student {
  id: number;
  name: string;
  info: string;
  age: number;
  created_at: string;
  profiles: StudentProfile[];
}