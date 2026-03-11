import type { FC } from "react";

import { cn } from "@shared/utils";

import type { IconProps } from "../types";

import { iconColor } from "../iconColor";
import s from "./Plus.module.scss";

export const Plus: FC<IconProps & { inCircle?: boolean }> = ({
  size = 20,
  color = iconColor.current,
  inCircle = false,
  ...props
}) => (
  <svg
    className={cn({ [s.circle]: inCircle })}
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
    <line x1="12" y1="5" x2="12" y2="19" />

    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
