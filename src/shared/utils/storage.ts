export type StorageType = "local" | "session";

const getStorage = (type: StorageType): Storage => {
  return type === "local" ? localStorage : sessionStorage;
};

export const getItem = (
  key: string,
  type: StorageType = "local",
): null | string => {
  try {
    return getStorage(type).getItem(key);
  } catch {
    return null;
  }
};

export const setItem = (
  key: string,
  value: string,
  type: StorageType = "local",
): void => {
  try {
    getStorage(type).setItem(key, value);
  } catch {
    // Silently fail if storage is not available
  }
};

export const removeItem = (key: string, type: StorageType = "local"): void => {
  try {
    getStorage(type).removeItem(key);
  } catch {
    // Silently fail if storage is not available
  }
};
