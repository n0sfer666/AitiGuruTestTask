import { LoginForm } from "@modules/auth/components/LoginForm";
import { $auth } from "@modules/auth/model";
import { useStore } from "effector-react";
import { type FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./LoginPage.module.scss";

export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useStore($auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/products", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <LoginForm />
      </div>
    </div>
  );
};
