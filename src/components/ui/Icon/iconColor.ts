// Icon color palette - structured repeatable colors
export const iconColor = {
  // Grays
  gray50: "#f9fafb",
  gray100: "#f3f4f6",
  gray200: "#e5e7eb",
  gray300: "#d1d5db",
  gray400: "#9ca3af",
  gray500: "#6b7280",
  gray600: "#4b5563",
  gray700: "#374151",
  gray800: "#1f2937",
  gray900: "#111827",

  // Primary colors
  white: "#ffffff",
  black: "#000000",
  current: "currentColor",

  // Special colors (reserved, unchangeable)
  primary: "#3b82f6",
  danger: "#ef4444",
  success: "#22c55e",
  warning: "#f59e0b",
} as const;

export type IconColor = (typeof iconColor)[keyof typeof iconColor];
