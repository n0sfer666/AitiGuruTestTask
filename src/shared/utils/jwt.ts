export interface JWTPayload {
  email: string;
  exp: number;
  firstName: string;
  iat: number;
  id: number;
  image: string;
  lastName: string;
  username: string;
}

export const parseJWT = (token: string): JWTPayload | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((char) => `%${(`00${char.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join(""),
    );
    return JSON.parse(jsonPayload) as JWTPayload;
  } catch {
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const payload = parseJWT(token);
  if (!payload || !payload.exp) {
    return true;
  }
  return Date.now() >= payload.exp * 1000;
};

export const getTokenExpiryDate = (token: string): Date | null => {
  const payload = parseJWT(token);
  if (!payload || !payload.exp) {
    return null;
  }
  return new Date(payload.exp * 1000);
};
