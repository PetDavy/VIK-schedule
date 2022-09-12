export interface User {
  username: string;
  email: string;
  token: string;
  created_at: string;
  picture: string | null;
  is_google_auth: boolean | null;
}