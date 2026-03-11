import { errorDictionary, type ErrorDomain } from "./errorDictionary";
import { toastError } from "./toast";

export interface AppError {
  code: number | string;
  domain: ErrorDomain;
  message: string;
  original?: unknown;
  status?: number;
}

export class ErrorHandler {
  private static getErrorMessage(
    domain: ErrorDomain,
    status: null | number,
    apiMessage: null | string,
  ): string {
    const domainDict = errorDictionary[domain] || errorDictionary.global;

    if (status && domainDict[String(status)]) {
      return domainDict[String(status)];
    }

    if (apiMessage) {
      for (const [key, value] of Object.entries(domainDict)) {
        if (apiMessage.includes(key)) {
          return value;
        }
      }
    }

    return domainDict.DEFAULT || errorDictionary.global.DEFAULT;
  }

  static async handle(error: unknown, domain: ErrorDomain): Promise<AppError> {
    let status: null | number = null;
    let apiMessage: null | string = null;

    // Handle Ky HTTP errors (they have a response property)
    if (typeof error === "object" && error !== null) {
      const err = error as {
        message?: string;
        response?: Response;
      };

      // Check if it's a Ky HTTPError with a response
      if (err.response && err.response instanceof Response) {
        status = err.response.status;
        try {
          const data = (await err.response.json()) as {
            error?: string;
            message?: string;
          };
          apiMessage = data.message || data.error || null;
        } catch {
          apiMessage = null;
        }
      } else if (err.message) {
        // Handle network/fetch errors
        if (
          err.message.includes("network") ||
          err.message.includes("fetch") ||
          err.message.includes("Failed to fetch")
        ) {
          return {
            message: errorDictionary.global.NETWORK_ERROR,
            code: "NETWORK_ERROR",
            domain: "global",
            original: error,
          };
        }
        apiMessage = err.message;
      }
    }

    // Handle plain Response objects
    if (error instanceof Response) {
      status = error.status;
      try {
        const data = (await error.json()) as {
          error?: string;
          message?: string;
        };
        apiMessage = data.message || data.error || null;
      } catch {
        apiMessage = null;
      }
    }

    const message = this.getErrorMessage(domain, status, apiMessage);

    return {
      message,
      code: apiMessage || status || "UNKNOWN",
      status: status || undefined,
      domain,
      original: error,
    };
  }

  static async handleAndToast(
    error: unknown,
    domain: ErrorDomain,
  ): Promise<AppError> {
    const appError = await this.handle(error, domain);
    toastError(appError.message);
    return appError;
  }

  static async handleResponse(
    response: Response,
    domain: ErrorDomain,
  ): Promise<AppError | null> {
    if (response.ok) {
      return null;
    }

    let apiMessage: null | string = null;

    try {
      const data = await response.json();
      apiMessage = data.message || data.error || null;
    } catch {
      apiMessage = null;
    }

    const message = this.getErrorMessage(domain, response.status, apiMessage);

    return {
      message,
      code: apiMessage || response.status,
      status: response.status,
      domain,
    };
  }
}

export const handleError = (
  error: unknown,
  domain: ErrorDomain,
): Promise<AppError> => {
  return ErrorHandler.handle(error, domain);
};

export const handleErrorWithToast = (
  error: unknown,
  domain: ErrorDomain,
): Promise<AppError> => {
  return ErrorHandler.handleAndToast(error, domain);
};
