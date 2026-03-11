import { useCallback, useState } from "react";

export type SortField = "id" | "price" | "rating" | "stock" | "title";
export type SortOrder = "asc" | "desc";

export interface SortConfig {
  field: SortField;
  order: SortOrder;
}

interface UseSortReturn {
  setSortField: (field: SortField) => void;
  sortConfig: SortConfig;
  toggleSortOrder: () => void;
}

const DEFAULT_SORT_CONFIG: SortConfig = {
  field: "id",
  order: "asc",
};

export const useSort = (initialConfig?: Partial<SortConfig>): UseSortReturn => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    ...DEFAULT_SORT_CONFIG,
    ...initialConfig,
  });

  const setSortField = useCallback((field: SortField) => {
    setSortConfig((prev) => ({
      ...prev,
      field,
      order: "asc",
    }));
  }, []);

  const toggleSortOrder = useCallback(() => {
    setSortConfig((prev) => ({
      ...prev,
      order: prev.order === "asc" ? "desc" : "asc",
    }));
  }, []);

  return {
    sortConfig,
    setSortField,
    toggleSortOrder,
  };
};
