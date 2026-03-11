import { Checkbox } from "@components/ui/Checkbox";
import { Icon, iconColor } from "@components/ui/Icon";
import { memo } from "react";

import type { Product } from "../../api/types";

import styles from "./ProductRow.module.scss";

interface ProductRowProps {
  product: Product;
}

const formatPrice = (price: number): string => {
  return `${price.toLocaleString("ru-RU")} ₽`;
};

const generateArticle = (id: number): string => {
  return `SKU-${String(id).padStart(6, "0")}`;
};

const formatVendor = (brand: string, category: string): string => {
  if (brand && brand.trim() !== "") {
    return brand;
  }
  // Fallback: capitalize category and replace hyphens with spaces
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const ProductRow = memo<ProductRowProps>(({ product }) => {
  const isLowRating = product.rating < 3;
  const ratingClass = isLowRating ?
    `${styles.rating} ${styles.lowRating}` :
    styles.rating;
  const starColor = isLowRating ? iconColor.danger : iconColor.warning;

  const vendor = formatVendor(product.brand, product.category);

  return (
    <tr>
      <td className={styles.checkboxCell}>
        <Checkbox />
      </td>

      <td className={styles.nameCell}>
        <div className={styles.productInfo}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className={styles.thumbnail}
          />

          <div className={styles.productDetails}>
            <span className={styles.title}>{product.title}</span>

            <span className={styles.category}>{product.category}</span>
          </div>
        </div>
      </td>

      <td className={styles.brandCell}>{vendor}</td>

      <td className={styles.articleCell}>{generateArticle(product.id)}</td>

      <td className={styles.ratingCell}>
        <span className={ratingClass}>
          <Icon.Star size={14} color={starColor} fill={starColor} />

          {product.rating.toFixed(1)}
        </span>
      </td>

      <td className={styles.priceCell}>{formatPrice(product.price)}</td>

      <td className={styles.actionsCell}>
        <div className={styles.actions}>
          <button className={styles.addButton} title="Добавить">
            <Icon.Plus size={16} color={iconColor.white} />
          </button>

          <button className={styles.moreButton} title="Еще">
            <Icon.MoreHorizontal size={16} color={iconColor.gray500} />
          </button>
        </div>
      </td>
    </tr>
  );
});

ProductRow.displayName = "ProductRow";
