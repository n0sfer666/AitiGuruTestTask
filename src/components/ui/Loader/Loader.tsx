import type { FC } from "react";

import type { LoaderProps } from "./types";

import styles from "./Loader.module.scss";

export const Loader: FC<LoaderProps> = ({
  size = "md",
  overlay = false,
  className = "",
  ...props
}) => {
  const sizeMap = {
    sm: styles.small,
    md: styles.medium,
    lg: styles.large,
  };

  const classes = [
    styles.wrapper,
    sizeMap[size],
    overlay && styles.overlay,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      <div className={styles.spinner} />
    </div>
  );
};
