import { User } from '../types/user';

const BASE_URL = 'http://localhost:5000';

export async function getUser(accessToken: string): Promise<User> {
  const userResponse: Response = await fetch(`${BASE_URL}/api/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });

  console.log('userResponse', userResponse);

  if (!userResponse.ok) {
    throw new Error(userResponse.statusText);
  }

  return userResponse.json();
}