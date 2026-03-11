import { NavigationBar } from "@components/layout";
import { Button } from "@components/ui/Button";
import { Icon, iconColor } from "@components/ui/Icon";
import { Loader } from "@components/ui/Loader";
import { Pagination } from "@components/ui/Pagination";
import { PaginationInfo } from "@components/ui/PaginationInfo";
import { type Product, productsApi } from "@modules/products/api";
import { AddProductForm } from "@modules/products/components/AddProductForm";
import { ProductTable } from "@modules/products/components/ProductTable";
import { SearchBar } from "@modules/products/components/SearchBar";
import { type SortField, useSearch, useSort } from "@modules/products/hooks";
import { type FC, useCallback, useEffect, useState } from "react";

import styles from "./ProductsPage.module.scss";

const ITEMS_PER_PAGE = 20;

export const ProductsPage: FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const { sortConfig, setSortField, toggleSortOrder } = useSort();
  const { searchQuery, setSearchQuery, debouncedQuery } = useSearch();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const skip = (currentPage - 1) * ITEMS_PER_PAGE;
      let response;

      if (debouncedQuery) {
        response = await productsApi.searchProducts(debouncedQuery, {
          limit: ITEMS_PER_PAGE,
          skip,
        });
      } else if (sortConfig.field !== "id" || sortConfig.order !== "asc") {
        response = await productsApi.sortProducts(
          sortConfig.field,
          sortConfig.order,
          {
            limit: ITEMS_PER_PAGE,
            skip,
          },
        );
      } else {
        response = await productsApi.getProducts({
          limit: ITEMS_PER_PAGE,
          skip,
        });
      }

      setProducts(response.products);
      setTotalProducts(response.total);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch products";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedQuery, sortConfig.field, sortConfig.order]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery]);

  const handleSort = useCallback(
    (field: keyof Product) => {
      if (sortConfig.field === field) {
        toggleSortOrder();
      } else {
        setSortField(field as SortField);
      }
    },
    [sortConfig.field, setSortField, toggleSortOrder],
  );

  const handleAddProductSuccess = useCallback(() => {
    setShowAddForm(false);
    fetchProducts();
  }, [fetchProducts]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

  return (
    <div className={styles.page}>
      <NavigationBar
        title="Товары"
        actions={(
          <div className={styles.searchWrapper}>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Найти"
            />
          </div>
        )}
      />

      {showAddForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <AddProductForm
              onSuccess={handleAddProductSuccess}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        </div>
      )}

      {error && (
        <div className={styles.error}>
          <p className={styles.errorText}>{error}</p>

          <Button onClick={fetchProducts}>Retry</Button>
        </div>
      )}

      {loading && !products.length ?
        (
          <div className={styles.loading}>
            <Loader size="lg" />
          </div>
        ) :
        (
          <ProductTable
            header={(
              <div className={styles.tableHeader}>
                <h2 className={styles.tableTitle}>Все позиции</h2>

                <div className={styles.tableActions}>
                  <Button variant="icon" onClick={fetchProducts} title="Обновить">
                    <Icon.RefreshCw size={20} color={iconColor.gray500} />
                  </Button>

                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => setShowAddForm(true)}
                  >
                    <Icon.Plus size={16} inCircle color={iconColor.white} />
                    Добавить
                  </Button>
                </div>
              </div>
            )}
            products={products}
            loading={loading}
            onSort={handleSort}
            sortConfig={sortConfig}
            footer={(
              <>
                {products.length > 0 && (
                  <div className={styles.paginationContainer}>
                    <PaginationInfo
                      currentPage={currentPage}
                      itemsPerPage={ITEMS_PER_PAGE}
                      totalItems={totalProducts}
                    />

                    {totalPages > 1 && (
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                    )}
                  </div>
                )}
              </>
            )}
          />
        )}
    </div>
  );
};
