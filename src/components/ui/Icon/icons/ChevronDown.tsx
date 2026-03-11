import type { FC } from "react";

import type { IconProps } from "../types";

import { iconColor } from "../iconColor";

export const ChevronDown: FC<IconProps> = ({
  size = 20,
  color = iconColor.current,
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
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
