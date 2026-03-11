import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant =
  | "danger" |
  "ghost" |
  "icon" |
  "primary" |
  "secondary";
export type ButtonSize = "lg" | "md" | "sm";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
}
