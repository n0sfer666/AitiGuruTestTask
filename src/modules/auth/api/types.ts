export interface LoginRequest {
  expiresInMins?: number;
  password: string;
  username: string;
}

export interface SignupRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  username: string;
}

export interface User {
  email: string;
  firstName: string;
  id: number;
  image: string;
  lastName: string;
  username: string;
}

export interface LoginResponse {
  accessToken: string;
  email: string;
  firstName: string;
  id: number;
  image: string;
  lastName: string;
  refreshToken: string;
  username: string;
}

export interface TokenResponse {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

// Note: DummyJSON /users/add returns a User object without tokens
export type SignupResponse = User;
