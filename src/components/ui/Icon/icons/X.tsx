import type { FC } from "react";

import type { IconProps } from "../types";

import { iconColor } from "../iconColor";

/**
 * X (Close/Clear) Icon
 * Used for clear buttons and close actions
 */
export const X: FC<IconProps> = ({
  size = 20,
  color = iconColor.gray500,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 6L6 18" />

    <path d="M6 6l12 12" />
  </svg>
);

X.displayName = "X";
