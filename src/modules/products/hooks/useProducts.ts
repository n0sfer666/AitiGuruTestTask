import { type Product, productsApi } from "@modules/products/api";
import { useEffect, useState } from "react";

interface UseProductsReturn {
  error: null | string;
  loading: boolean;
  products: Product[];
  refetch: () => void;
}

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const loadProducts = async (): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const response = await productsApi.getProducts();
        if (!cancelled) {
          setProducts(response.products);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          const errorMessage =
            err instanceof Error ? err.message : "Failed to fetch products";
          setError(errorMessage);
          setLoading(false);
        }
      }
    };

    void loadProducts();

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  const refetch = (): void => {
    setRefreshKey((prev) => prev + 1);
  };

  return {
    products,
    loading,
    error,
    refetch,
  };
};
