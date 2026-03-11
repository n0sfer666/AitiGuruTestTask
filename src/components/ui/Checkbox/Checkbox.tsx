import { type FC, forwardRef, type RefObject, useId } from "react";

import type { CheckboxProps } from "./types";

import styles from "./Checkbox.module.scss";

export const Checkbox: FC<CheckboxProps> = forwardRef<
  HTMLInputElement,
  CheckboxProps
>(({ label, className = "", id: providedId, ...props }, ref) => {
  const generatedId = useId();
  const id = providedId ?? generatedId;

  return (
    <label className={`${styles.wrapper} ${className}`} htmlFor={id}>
      <input
        ref={ref as RefObject<HTMLInputElement>}
        type="checkbox"
        id={id}
        className={styles.input}
        {...props}
      />

      <span className={styles.box}>
        <svg
          className={styles.checkIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>

      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
});

Checkbox.displayName = "Checkbox";
