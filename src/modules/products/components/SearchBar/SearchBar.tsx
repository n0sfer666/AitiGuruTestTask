import { Icon, iconColor } from "@components/ui/Icon";
import { Input } from "@components/ui/Input";
import { debounce, DEFAULT_DEBOUNCE_MS } from "@shared/hooks";
import { type FC, useCallback, useRef, useState } from "react";

import type { SearchBarProps } from "./types";

import styles from "./SearchBar.module.scss";

export const SearchBar: FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Поиск товаров...",
}) => {
  const [inputValue, setInputValue] = useState(value);
  const debouncedOnChange = useRef(
    debounce((query: string) => {
      onChange(query);
    }, DEFAULT_DEBOUNCE_MS),
  ).current;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      debouncedOnChange(newValue);
    },
    [debouncedOnChange],
  );

  return (
    <div className={styles.wrapper}>
      <Input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        clearable
        className={styles.input}
        icon={<Icon.Search size={20} color={iconColor.gray500} />}
      />
    </div>
  );
};
