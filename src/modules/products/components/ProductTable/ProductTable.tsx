import type { FC, ReactNode } from "react";

import { Checkbox } from "@components/ui/Checkbox";
import { Icon, iconColor } from "@components/ui/Icon";
import { Loader } from "@components/ui/Loader";
import { Typography } from "@components/ui/Typography";

import type { Product } from "../../api/types";
import type { ProductTableProps, SortConfig } from "./types";

import { ProductRow } from "./ProductRow";
import styles from "./ProductTable.module.scss";

const getSortIndicator = (
  field: keyof Product,
  sortConfig: SortConfig,
): ReactNode => {
  if (sortConfig.field !== field) {
    return null;
  }
  return (
    <Icon.ChevronDown
      size={16}
      color={iconColor.gray500}
      style={{
        display: "inline-block",
        marginLeft: "4px",
        transform: sortConfig.order === "asc" ? "rotate(180deg)" : "none",
        transition: "transform 0.2s ease",
      }}
    />
  );
};

export const ProductTable: FC<ProductTableProps> = ({
  header,
  footer,
  products,
  loading,
  onSort,
  sortConfig,
}) => {
  const columns: {
    field: "actions" | "checkbox" | keyof Product;
    label: string;
  }[] = [
    { field: "checkbox", label: "" },
    { field: "title", label: "Наименование" },
    { field: "brand", label: "Вендор" },
    { field: "id", label: "Артикул" },
    { field: "rating", label: "Оценка" },
    { field: "price", label: "Цена" },
    { field: "actions", label: "" },
  ];

  if (loading) {
    return (
      <div className={styles.loading}>
        <Loader size="lg" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <>
        {header}

        <div className={styles.empty}>
          <Typography variant="body" color="secondary" align="center">
            Товары не найдены
          </Typography>
        </div>
      </>
    );
  }

  return (
    <div className={styles.wrapper}>
      {header}

      <table>
        <thead>
          <tr>
            {columns.map(({ field, label }) => (
              <th
                key={field}
                className={
                  field === "checkbox" || field === "actions" ?
                    styles.actionHeader :
                    styles.header
                }
                onClick={() =>
                  field !== "checkbox" &&
                  field !== "actions" &&
                  field !== "id" &&
                  onSort(field as keyof Product)}
              >
                {field === "checkbox" ? <Checkbox /> : label}

                {field !== "checkbox" &&
                  field !== "actions" &&
                  field !== "id" &&
                  getSortIndicator(field as keyof Product, sortConfig)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </tbody>
      </table>

      {footer}
    </div>
  );
};
