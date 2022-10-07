import { API_ROOT } from "./api";
import { Student } from "../types/student";
import { CreateStudent } from "../types/student";
import { ResponseErrorType } from "./api";

export async function loadStudents(accessToken: string): Promise<Student[]> {
  const studentsResponse: Response = await fetch(`${API_ROOT}/api/students`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!studentsResponse.ok) {
    throw new Error(studentsResponse.statusText);
  }

  return studentsResponse.json();
}

export async function createStudent(
  student: CreateStudent,
  accessToken: string
): Promise<Student | ResponseErrorType> {
  const studentResponse: Response = await fetch(`${API_ROOT}/api/student`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  if (studentResponse.status === 201 || studentResponse.status === 422) {
    return studentResponse.json();
  }

  throw new Error(studentResponse.statusText);
}
