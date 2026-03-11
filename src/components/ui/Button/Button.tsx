import { type FC, type ForwardedRef, forwardRef } from "react";

import type { ButtonProps } from "./types";

import styles from "./Button.module.scss";

export const Button: FC<ButtonProps> = forwardRef(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      className = "",
      disabled,
      children,
      ...props
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    const sizeMap = {
      sm: styles.small,
      md: styles.medium,
      lg: styles.large,
    };

    const variantMap = {
      primary: styles.primary,
      secondary: styles.secondary,
      danger: styles.danger,
      icon: styles.icon,
      ghost: styles.ghost,
    };

    const classes = [
      styles.base,
      variantMap[variant],
      sizeMap[size],
      fullWidth && styles.fullWidth,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} className={classes} disabled={disabled} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
