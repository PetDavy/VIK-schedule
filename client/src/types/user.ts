export interface User {
  username: string;
  email: string;
  token: string;
  created_at: string;
  picture: string | null;
  is_google_auth: boolean | null;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister extends UserLogin {
  username: string;
}

export interface UserUpdate {
  username?: string;
  email?: string;
  picture?: string;
  password?: string;
  new_password?: string;
}
