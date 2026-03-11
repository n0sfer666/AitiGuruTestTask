import { type ElementType, forwardRef, type ReactNode } from "react";

import styles from "./Typography.module.scss";

export type TypographyVariant =
  | "body" |
  "bodySmall" |
  "caption" |
  "h1" |
  "h2" |
  "h3" |
  "h4" |
  "helper" |
  "label" |
  "overline";

export type TypographyColor =
  | "error" |
  "inherit" |
  "muted" |
  "primary" |
  "secondary" |
  "success" |
  "warning" |
  "white";

export type TypographyAlign = "center" | "justify" | "left" | "right";

export type TypographyWeight = "bold" | "medium" | "normal" | "semibold";

export type TypographyTransform =
  | "capitalize" |
  "lowercase" |
  "none" |
  "uppercase";

export interface TypographyProps<T extends ElementType = ElementType> {
  /** Text alignment */
  align?: TypographyAlign;
  /** The content of the component */
  children: ReactNode;
  /** Additional className */
  className?: string;
  /** The color of the text */
  color?: TypographyColor;
  /** The component to render (polymorphic) */
  component?: T;
  /** Number of lines to show before truncation (requires custom CSS) */
  lines?: number;
  /** Disable text wrapping */
  noWrap?: boolean;
  /** HTML title attribute (for truncated text) */
  title?: string;
  /** Text transform */
  transform?: TypographyTransform;
  /** Truncate text with ellipsis */
  truncate?: boolean;
  /** The variant of the typography */
  variant?: TypographyVariant;
  /** Font weight */
  weight?: TypographyWeight;
}

// Map variants to default semantic HTML elements
const variantElementMap: Record<TypographyVariant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  bodySmall: "p",
  caption: "span",
  label: "label",
  helper: "span",
  overline: "span",
};

// Map variant names to CSS module classes
const variantClasses: Record<TypographyVariant, string> = {
  h1: styles.h1,
  h2: styles.h2,
  h3: styles.h3,
  h4: styles.h4,
  body: styles.body,
  bodySmall: styles.bodySmall,
  caption: styles.caption,
  label: styles.label,
  helper: styles.helper,
  overline: styles.overline,
};

// Map color names to CSS module classes
const colorClasses: Record<Exclude<TypographyColor, "inherit">, string> = {
  primary: styles.primaryColor,
  secondary: styles.secondaryColor,
  muted: styles.muted,
  error: styles.error,
  success: styles.success,
  warning: styles.warning,
  white: styles.white,
};

// Map alignment names to CSS module classes
const alignClasses: Record<TypographyAlign, string> = {
  left: styles.left,
  center: styles.center,
  right: styles.right,
  justify: styles.justify,
};

// Map weight names to CSS module classes
const weightClasses: Record<TypographyWeight, string> = {
  normal: styles.normal,
  medium: styles.medium,
  semibold: styles.semibold,
  bold: styles.bold,
};

// Map transform names to CSS module classes
const transformClasses: Record<Exclude<TypographyTransform, "none">, string> = {
  uppercase: styles.uppercase,
  lowercase: styles.lowercase,
  capitalize: styles.capitalize,
};

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      children,
      variant = "body",
      component,
      color = "inherit",
      align,
      weight,
      transform,
      truncate = false,
      lines,
      noWrap = false,
      className = "",
      title,
      ...props
    },
    ref,
  ) => {
    const Component = component || variantElementMap[variant];

    const classes = [
      styles.base,
      variantClasses[variant],
      color !== "inherit" && colorClasses[color],
      align && alignClasses[align],
      weight && weightClasses[weight],
      transform && transform !== "none" && transformClasses[transform],
      truncate && styles.truncate,
      lines && styles[`lines${lines}` as keyof typeof styles],
      noWrap && styles.nowrap,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Component ref={ref} className={classes} title={title} {...props}>
        {children}
      </Component>
    );
  },
);

Typography.displayName = "Typography";

export default Typography;
