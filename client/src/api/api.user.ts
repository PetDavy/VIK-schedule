import { API_ROOT, ResponseErrorType } from "./api";
import { User, UserLogin, UserRegister } from "../types/user";

export async function registerUser(
  user: UserRegister
): Promise<User | ResponseErrorType> {
  const registerResponse = await fetch(`${API_ROOT}/api/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (registerResponse.status === 201 || registerResponse.status === 422) {
    return registerResponse.json();
  }

  throw new Error(registerResponse.statusText);
}

export async function login(
  user: UserLogin
): Promise<User | ResponseErrorType> {
  const loginResponse: Response = await fetch(`${API_ROOT}/api/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (
    loginResponse.status === 200 ||
    loginResponse.status === 422 ||
    loginResponse.status === 400
  ) {
    return loginResponse.json();
  }

  throw new Error(loginResponse.statusText);
}

export async function loginWithGoogle() {
  const loginResponse: Response = await fetch(`${API_ROOT}/login/google`);

  if (!loginResponse.ok) {
    throw new Error(loginResponse.statusText);
  }

  return loginResponse.json();
}

export async function getUser(accessToken: string): Promise<User> {
  const userResponse: Response = await fetch(`${API_ROOT}/api/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!userResponse.ok) {
    throw new Error(userResponse.statusText);
  }

  const userData: User = await userResponse.json();

  return {
    ...userData,
    token: accessToken,
  };
}
