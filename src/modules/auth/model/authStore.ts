import { getToken, removeToken } from "@shared/utils/cookies";
import { isTokenExpired, parseJWT } from "@shared/utils/jwt";
import { createStore } from "effector";

import type { User } from "../api/types";

import { loginSuccess, logout } from "./authEvents";

export interface AuthState {
  expiresAt: null | number;
  isAuthenticated: boolean;
  token: null | string;
  user: null | User;
}

const getInitialToken = (): null | string => {
  const token = getToken();
  if (!token || isTokenExpired(token)) {
    if (token) {
      removeToken();
    }
    return null;
  }
  return token;
};

const getInitialUser = (token: null | string): null | User => {
  if (!token) {
    return null;
  }
  const payload = parseJWT(token);
  if (!payload) {
    return null;
  }
  return {
    id: payload.id,
    username: payload.username,
    email: payload.email,
    firstName: payload.firstName,
    lastName: payload.lastName,
    image: payload.image,
  };
};

const getInitialExpiry = (token: null | string): null | number => {
  if (!token) {
    return null;
  }
  const payload = parseJWT(token);
  return payload?.exp ?? null;
};

const initialToken = getInitialToken();

export const initialState: AuthState = {
  token: initialToken,
  user: getInitialUser(initialToken),
  isAuthenticated: !!initialToken,
  expiresAt: getInitialExpiry(initialToken),
};

export const $auth = createStore<AuthState>(initialState);

$auth.on(loginSuccess, (_, payload) => {
  const user: User = {
    id: payload.user.id,
    username: payload.user.username,
    email: payload.user.email,
    firstName: payload.user.firstName,
    lastName: payload.user.lastName,
    image: payload.user.image,
  };

  return {
    token: payload.token,
    user,
    isAuthenticated: true,
    expiresAt: payload.expiresAt ?? null,
  };
});

$auth.on(logout, () => {
  removeToken();

  return {
    token: null,
    user: null,
    isAuthenticated: false,
    expiresAt: null,
  };
});
