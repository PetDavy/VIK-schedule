import { User } from '../types/user';

const BASE_URL = 'http://localhost:5000';

export async function getUser(accessToken: string): Promise<User> {
  const user = await fetch(`${BASE_URL}/api/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });

  return user.json();
}