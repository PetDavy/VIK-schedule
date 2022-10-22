import { API_ROOT } from "./api";
import { StudentProfile, UpdateStudentProfile, CreateStudentProfile } from "../types/studentProfile";
import { ResponseErrorType } from "./api";


export async function creatStudentProfile(
  studentId: number,
  studentProfile: CreateStudentProfile,
  accessToken: string
): Promise<StudentProfile | ResponseErrorType> {
  const profileData = {
    student_id: studentId,
    class_price: studentProfile.class_price,
  }

  const response = await fetch(`${API_ROOT}/api/student/profile`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  });

  // todo: change this
  if (response.ok) {
    return await response.json();
  } else {
    return await response.json();
  }
}

export async function updateStudentProfile(
  studentProfile: UpdateStudentProfile,
  accessToken: string
): Promise<StudentProfile | ResponseErrorType> {
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