export interface User {
  email: string;
  firstName: string;
  id: number;
  image: string;
  lastName: string;
  username: string;
}

export interface Token {
  refreshToken: string;
  token: string;
}

export interface APIResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface APIError {
  message: string;
  status: number;
}
