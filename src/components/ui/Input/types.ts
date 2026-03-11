import type { InputHTMLAttributes, ReactNode } from "react";

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  clearable?: boolean;
  error?: string;
  icon?: ReactNode;
  label?: string;
  rightElement?: ReactNode;
  size?: "large" | "medium" | "small";
}
