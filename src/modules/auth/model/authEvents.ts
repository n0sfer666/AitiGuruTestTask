import { createEvent } from "effector";

import type { User } from "../api/types";

export interface LoginSuccessPayload {
  expiresAt?: number;
  rememberMe: boolean;
  token: string;
  user: User;
}

export const loginSuccess = createEvent<LoginSuccessPayload>();
export const logout = createEvent<void>();
export const setUser = createEvent<User>();
