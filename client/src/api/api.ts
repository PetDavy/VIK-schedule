import { User } from '../types/user';
import { Student } from '../types/student';

const BASE_URL = 'http://localhost:5000';

export interface ResponseErrorType {
  errors: string[];
}

export async function getUser(accessToken: string): Promise<User> {
  const userResponse: Response = await fetch(`${BASE_URL}/api/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });

  if (!userResponse.ok) {
    throw new Error(userResponse.statusText);
  }

  const userData: User = await userResponse.json();

  return {
    ...userData,
    token: accessToken
  };
}

export async function loadStudents(accessToken: string): Promise<Student[]> {
  const studentsResponse: Response = await fetch(`${BASE_URL}/api/students`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });

  if (!studentsResponse.ok) {
    throw new Error(studentsResponse.statusText);
  }

  return studentsResponse.json();
}

export async function login(email: string, password: string): Promise<User | ResponseErrorType> {
  const loginResponse: Response = await fetch(`${BASE_URL}/api/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    })
  });
  if (loginResponse.status === 200 || loginResponse.status === 400) {
    return loginResponse.json();
  }
  
  throw new Error(loginResponse.statusText);
}

export async function loginWithGoogle() {
  const loginResponse: Response = await fetch(`${BASE_URL}/login/google`);
  
  if (!loginResponse.ok) {
    throw new Error(loginResponse.statusText);
  }

  return loginResponse.json();
}