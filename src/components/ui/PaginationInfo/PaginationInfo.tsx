import type { FC } from "react";

import styles from "./PaginationInfo.module.scss";

interface PaginationInfoProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

export const PaginationInfo: FC<PaginationInfoProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={styles.info}>
      <span className={styles.range}>
        {startItem}

        -
        {endItem}
      </span>

      <span className={styles.label}>из</span>

      <span className={styles.total}>{totalItems}</span>
    </div>
  );
};
