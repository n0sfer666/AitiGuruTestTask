export type ErrorDomain = "auth" | "global" | "products";

export interface ErrorDictionary {
  [domain: string]: {
    [codeOrMessage: string]: string;
  };
}

export const errorDictionary: ErrorDictionary = {
  auth: {
    400: "Неправильные логин и (или) пароль",
    401: "Сессия истекла. Пожалуйста, войдите снова",
    403: "Доступ запрещен",
    "Invalid credentials": "Неправильные логин и (или) пароль",
    "Invalid/Expired Token!": "Сессия истекла. Пожалуйста, войдите снова",
    "Token refresh failed": "Не удалось обновить сессию",
    DEFAULT: "Ошибка авторизации. Попробуйте позже",
  },
  products: {
    400: "Некорректный запрос",
    401: "Необходима авторизация",
    404: "Товар не найден",
    500: "Ошибка сервера. Попробуйте позже",
    "Product with id": "Товар не найден",
    DEFAULT: "Не удалось загрузить товары. Попробуйте позже",
  },
  global: {
    NETWORK_ERROR: "Ошибка сети. Проверьте подключение к интернету",
    TIMEOUT: "Превышено время ожидания. Попробуйте снова",
    UNKNOWN: "Произошла неизвестная ошибка",
    DEFAULT: "Произошла ошибка. Попробуйте позже",
  },
};
