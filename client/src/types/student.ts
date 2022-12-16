import { StudentProfile } from "./studentProfile";

export interface Student {
  id: number;
  name: string;
  info: string;
  age: number;
  contact: string;
  created_at: string;
  profiles: StudentProfile[];
}

export interface CreateStudent {
  name: string;
  age?: number;
  info?: string;
  contact?: string;
}

export interface UpdateStudent {
  id: number;
  name?: string;
  age?: number;
  info?: string;
  contact?: string;
}