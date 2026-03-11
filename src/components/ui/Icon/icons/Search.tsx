import type { FC } from "react";

import type { IconProps } from "../types";

import { iconColor } from "../iconColor";

export const Search: FC<IconProps> = ({
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
    <circle cx="11" cy="11" r="8" />

    <path d="m21 21-4.35-4.35" />
  </svg>
);
