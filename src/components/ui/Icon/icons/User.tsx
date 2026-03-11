import type { FC } from "react";

import type { IconProps } from "../types";

import { iconColor } from "../iconColor";

export const User: FC<IconProps> = ({
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
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />

    <circle cx="12" cy="7" r="4" />
  </svg>
);
