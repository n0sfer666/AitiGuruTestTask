export const TOKEN_KEY = "token";

export const setCookie = (name: string, value: string, days?: number): void => {
  const expires = days ?
    `; expires=${new Date(Date.now() + days * 86400000).toUTCString()}` :
    "";
  document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/; SameSite=Strict`;
};

export const getCookie = (name: string): null | string => {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split("=");
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
};

export const removeCookie = (name: string): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const setToken = (token: string, rememberMe: boolean): void => {
  const days = rememberMe ? 30 : undefined;
  setCookie(TOKEN_KEY, token, days);
};

export const getToken = (): null | string => {
  return getCookie(TOKEN_KEY);
};

export const removeToken = (): void => {
  removeCookie(TOKEN_KEY);
};
