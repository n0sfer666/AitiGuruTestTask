import type { FC } from "react";

import { Button } from "@components/ui/Button";
import { Typography } from "@components/ui/Typography";
import { Link } from "react-router-dom";

import styles from "./NotFoundPage.module.scss";

export const NotFoundPage: FC = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Typography variant="h1" align="center" className={styles.title}>
            404
          </Typography>

          <Typography variant="h2" align="center" color="secondary">
            Page Not Found
          </Typography>

          <Typography variant="body" align="center" color="muted">
            The page you are looking for does not exist or has been moved.
          </Typography>

          <Link to="/products" className={styles.link}>
            <Button variant="primary" size="lg">
              Go to Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
