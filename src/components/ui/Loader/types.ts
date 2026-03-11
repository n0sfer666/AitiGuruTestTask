import type { HTMLAttributes } from "react";

export type LoaderSize = "lg" | "md" | "sm";

export interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  overlay?: boolean;
  size?: LoaderSize;
}
