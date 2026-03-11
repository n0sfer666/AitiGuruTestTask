import type { FC, ReactNode } from "react";

import styles from "./NavigationBar.module.scss";

interface NavigationBarProps {
  actions?: ReactNode;
  title: string;
}

export const NavigationBar: FC<NavigationBarProps> = ({ title, actions }) => {
  return (
    <nav className={styles.bar}>
      <h1 className={styles.title}>{title}</h1>

      {actions && <div className={styles.actions}>{actions}</div>}
    </nav>
  );
};
