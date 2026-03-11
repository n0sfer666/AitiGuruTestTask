import type { FC } from "react";

import { SignupForm } from "@modules/auth/components/SignupForm";

import styles from "./SignupPage.module.scss";

export const SignupPage: FC = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <SignupForm />
      </div>
    </div>
  );
};
