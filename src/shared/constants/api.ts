export const API_BASE_URL = "https://dummyjson.com";

export const ENDPOINTS = {
  auth: {
    login: "auth/login",
    refresh: "auth/refresh",
    me: "auth/me",
  },
  users: {
    add: "users/add",
    single: (id: number) => `users/${id}`,
  },
  products: {
    base: "products",
    search: "products/search",
    limit: "products?limit=0",
    single: (id: number) => `products/${id}`,
  },
} as const;
