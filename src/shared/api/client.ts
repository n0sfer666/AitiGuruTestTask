import ky, {
  type AfterResponseHook,
  type BeforeRequestHook,
  type KyInstance,
} from "ky";

import { API_BASE_URL } from "../constants/api";
import { getToken } from "../utils/cookies";

const beforeAuthHook: BeforeRequestHook = (request) => {
  const token = getToken();
  if (token) {
    request.headers.set("Authorization", `Bearer ${token}`);
  }
};

const afterAuthHook: AfterResponseHook = (_request, _options, response) => {
  if (response.status === 401) {
    return response;
  }
  return response;
};

export const api: KyInstance = ky.create({
  prefixUrl: API_BASE_URL,
  hooks: {
    beforeRequest: [beforeAuthHook],
    afterResponse: [afterAuthHook],
  },
});
