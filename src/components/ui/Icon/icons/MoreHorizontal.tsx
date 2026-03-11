import type { FC } from "react";

import type { IconProps } from "../types";

import { iconColor } from "../iconColor";

export const MoreHorizontal: FC<IconProps> = ({
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
    <circle cx="12" cy="12" r="1" />

    <circle cx="19" cy="12" r="1" />

    <circle cx="5" cy="12" r="1" />
  </svg>
);
