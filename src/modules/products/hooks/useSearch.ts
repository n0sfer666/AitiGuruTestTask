import { useCallback, useEffect, useRef, useState } from "react";

interface UseSearchReturn {
  clearSearch: () => void;
  debouncedQuery: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const DEFAULT_DEBOUNCE_MS = 300;

export const useSearch = (debounceMs: number = DEFAULT_DEBOUNCE_MS): UseSearchReturn => {
  const [searchQuery, setSearchQueryState] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const timeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryState(query);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQueryState("");
    setDebouncedQuery("");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, debounceMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchQuery, debounceMs]);

  return {
    searchQuery,
    setSearchQuery,
    clearSearch,
    debouncedQuery,
  };
};
