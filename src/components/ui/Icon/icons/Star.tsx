import type { FC } from "react";

import type { IconProps } from "../types";

import { iconColor } from "../iconColor";

/**
 * Star Icon
 * Used for rating displays
 */
export const Star: FC<IconProps> = ({
  size = 20,
  color = iconColor.gray500,
  fill = "none",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

Star.displayName = "Star";
