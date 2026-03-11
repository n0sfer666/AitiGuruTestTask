import { Icon, iconColor } from "@components/ui/Icon";
import { type FC, forwardRef, type RefObject, useId, useState } from "react";

import type { InputProps } from "./types";

import styles from "./Input.module.scss";

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      className = "",
      id: providedId,
      icon,
      rightElement,
      clearable,
      type = "text",
      value,
      onChange,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = providedId ?? generatedId;
    const [showPassword, setShowPassword] = useState(false);
    const [internalValue, setInternalValue] = useState("");

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const hasValue = currentValue !== "" && currentValue !== undefined;

    const inputType = type === "password" && showPassword ? "text" : type;
    const isPassword = type === "password";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) {
        setInternalValue("");
      }
      const syntheticEvent = {
        target: { value: "" },
        currentTarget: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(syntheticEvent);
    };

    const showClearButton = clearable && hasValue && !isPassword;

    const inputClasses = [
      styles.field,
      icon && styles.withLeftIcon,
      (showClearButton || rightElement) && styles.withRightElement,
      error && styles.hasError,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}

        <div className={styles.container}>
          {icon && <span className={styles.iconLeft}>{icon}</span>}

          <input
            ref={ref as RefObject<HTMLInputElement>}
            id={id}
            type={inputType}
            className={inputClasses}
            value={currentValue}
            onChange={handleChange}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ?
                (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />

                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) :
                (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />

                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
            </button>
          )}

          {showClearButton && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClear}
              tabIndex={-1}
              aria-label="Clear input"
            >
              <Icon.X size={16} color={iconColor.gray500} />
            </button>
          )}

          {rightElement && (
            <span className={styles.iconRight}>{rightElement}</span>
          )}
        </div>

        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";
