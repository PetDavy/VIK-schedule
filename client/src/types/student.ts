import { StudentProfile } from "./studentProfile";

export interface Student {
  id: number;
  name: string;
  info: string;
  age: number;
  created_at: string;
  profiles: StudentProfile[];
}

export interface CreateStudent {
  name: string;
  age?: number;
  info?: string;
}

export interface UpdateStudent {
  id: number;
  name?: string;
  age?: number;
  info?: string;
}