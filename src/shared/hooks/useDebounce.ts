export const DEFAULT_DEBOUNCE_MS = 300;

export function debounce<T extends unknown[], R>(
  func: (...args: T) => R,
  delay: number = DEFAULT_DEBOUNCE_MS,
): (...args: T) => Promise<R> {
  let timer: null | ReturnType<typeof setTimeout> = null;

  return (...args: T) =>
    new Promise<R>((resolve) => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        resolve(func(...args));
      }, delay);
    });
}

export function debounceAsync<T extends unknown[], R>(
  func: (...args: T) => Promise<R>,
  delay: number = DEFAULT_DEBOUNCE_MS,
): (...args: T) => Promise<R> {
  let timer: null | ReturnType<typeof setTimeout> = null;
  let pendingPromise: null | Promise<R> = null;

  return (...args: T) => {
    if (pendingPromise) {
      return pendingPromise;
    }

    pendingPromise = new Promise<R>((resolve, reject) => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        try {
          const result = await func(...args);
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          pendingPromise = null;
        }
      }, delay);
    });

    return pendingPromise;
  };
}
