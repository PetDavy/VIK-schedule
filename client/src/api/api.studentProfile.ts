import { API_ROOT } from "./api";
import { StudentProfile, UpdateStudentProfile } from "../types/studentProfile";
import { ResponseErrorType } from "./api";

export async function updateStudentProfile(
  studentProfile: UpdateStudentProfile,
  accessToken: string
): Promise<StudentProfile | ResponseErrorType> {
  console.log("updateStudentProfile", studentProfile);
  const studentProfileResponse: Response = await fetch(
    `${API_ROOT}/api/student/profile`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentProfile),
    }
  );

  if (
    studentProfileResponse.status === 200 ||
    studentProfileResponse.status === 403 ||
    studentProfileResponse.status === 422
  ) {
    return studentProfileResponse.json();
  }

  throw new Error(studentProfileResponse.statusText);
}