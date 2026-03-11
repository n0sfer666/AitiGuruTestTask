import type { InputHTMLAttributes, ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  clearable?: boolean;
  error?: string;
  icon?: ReactNode;
  label?: string;
  rightElement?: ReactNode;
}
