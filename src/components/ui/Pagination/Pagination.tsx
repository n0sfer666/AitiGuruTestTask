import type { FC } from "react";

import { Icon, iconColor } from "@components/ui/Icon";

import styles from "./Pagination.module.scss";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = (): number[] => {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const handlePrevious = (): void => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = (): void => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        type="button"
        className={styles.navButton}
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <Icon.ChevronDown
          size={16}
          color={iconColor.gray500}
          style={{ transform: "rotate(90deg)" }}
        />
      </button>

      <div className={styles.pageNumbers}>
        {pageNumbers.map((page) => (
          <button
            key={page}
            type="button"
            className={`${styles.pageButton} ${
              page === currentPage ? styles.active : ""
            }`}
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={styles.navButton}
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <Icon.ChevronDown
          size={16}
          color={iconColor.gray500}
          style={{ transform: "rotate(-90deg)" }}
        />
      </button>
    </nav>
  );
};
