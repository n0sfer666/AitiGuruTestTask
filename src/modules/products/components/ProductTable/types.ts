export interface SortConfig {
  field: "" | keyof import("../../api/types").Product;
  order: "asc" | "desc";
}

export interface ProductTableProps {
  loading: boolean;
  onSort: (field: keyof import("../../api/types").Product) => void;
  products: import("../../api/types").Product[];
  sortConfig: SortConfig;
}
