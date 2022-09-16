import { User } from '../types/user';

const BASE_URL = 'http://localhost:5000';

export async function getUser(accessToken: string): Promise<User> {
  const userResponse: Response = await fetch(`${BASE_URL}/api/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });

  if (!userResponse.ok) {
    throw new Error(userResponse.statusText);
  }

  return userResponse.json();
}

export async function login(email: string, password: string): Promise<User> {
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

  if (!loginResponse.ok) {
    throw new Error(loginResponse.statusText);
  }

  return loginResponse.json();
}