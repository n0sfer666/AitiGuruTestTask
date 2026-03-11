import { api } from "@shared/api/client";
import { ENDPOINTS } from "@shared/constants/api";
import { handleError } from "@shared/utils/errorHandler";

import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  TokenResponse,
  User,
} from "./types";

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await api
        .post(ENDPOINTS.auth.login, { json: credentials })
        .json<LoginResponse>();
      return response;
    } catch (error) {
      throw await handleError(error, "auth");
    }
  },

  signup: async (data: SignupRequest): Promise<SignupResponse> => {
    try {
      const response = await api
        .post(ENDPOINTS.users.add, { json: data })
        .json<SignupResponse>();
      return response;
    } catch (error) {
      throw await handleError(error, "auth");
    }
  },

  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await api.get("auth/me").json<User>();
      return response;
    } catch (error) {
      throw await handleError(error, "auth");
    }
  },

  refreshToken: async (refreshToken: string): Promise<TokenResponse> => {
    try {
      const response = await api
        .post(ENDPOINTS.auth.refresh, {
          json: { refreshToken },
        })
        .json<TokenResponse>();
      return response;
    } catch (error) {
      throw await handleError(error, "auth");
    }
  },
};
