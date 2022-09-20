import { API_ROOT } from "./api";
import { Student } from '../types/student';

export async function loadStudents(accessToken: string): Promise<Student[]> {
  const studentsResponse: Response = await fetch(`${API_ROOT}/api/students`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });

  if (!studentsResponse.ok) {
    throw new Error(studentsResponse.statusText);
  }

  return studentsResponse.json();
}