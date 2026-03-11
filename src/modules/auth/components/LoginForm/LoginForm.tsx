import { Button } from "@components/ui/Button";
import { Checkbox } from "@components/ui/Checkbox";
import { Icon, iconColor } from "@components/ui/Icon";
import { Input } from "@components/ui/Input";
import { Typography } from "@components/ui/Typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { authApi } from "@modules/auth/api";
import { loginSuccess } from "@modules/auth/model";
import { setToken } from "@shared/utils/cookies";
import { parseJWT } from "@shared/utils/jwt";
import { type FC, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import type { LoginFormData } from "./types";

import styles from "./LoginForm.module.scss";

const loginSchema = z.object({
  username: z.string().min(1, "Введите логин"),
  password: z.string().min(1, "Введите пароль"),
  rememberMe: z.boolean().default(false),
});

// Cache for storing failed credential combinations
const failedCredentialsCache = new Set<string>();

export const LoginForm: FC = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<null | string>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  // Watch form values to detect changes
  // eslint-disable-next-line react-hooks/incompatible-library
  const watchedUsername = watch("username");

  const watchedPassword = watch("password");

  // Check if current credentials match a failed attempt
  const isCredentialsBlocked = useMemo(() => {
    const credentialKey = `${watchedUsername}:${watchedPassword}`;
    return failedCredentialsCache.has(credentialKey);
  }, [watchedUsername, watchedPassword]);

  const onSubmit = async (data: LoginFormData) => {
    // Clear previous error
    setServerError(null);

    try {
      const response = await authApi.login({
        username: data.username,
        password: data.password,
      });

      // Remove from failed cache on success
      const credentialKey = `${data.username}:${data.password}`;
      failedCredentialsCache.delete(credentialKey);

      setToken(response.accessToken, data.rememberMe);

      const payload = parseJWT(response.accessToken);

      loginSuccess({
        token: response.accessToken,
        user: {
          id: response.id,
          username: response.username,
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
          image: response.image,
        },
        rememberMe: data.rememberMe,
        expiresAt: payload?.exp,
      });

      navigate("/products");
    } catch (error) {
      // Handle both Error instances and AppError objects from handleError
      let errorMessage = "Ошибка авторизации";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
      ) {
        errorMessage = (error as { message: string }).message;
      }

      setServerError(errorMessage);

      // Add failed credentials to cache
      const credentialKey = `${data.username}:${data.password}`;
      failedCredentialsCache.add(credentialKey);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.innerFrame}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Icon.Logo size={64} color={iconColor.gray800} />
          </div>

          <Typography variant="h1" align="center">
            Добро пожаловать!
          </Typography>

          <Typography variant="bodySmall" color="secondary" align="center">
            Пожалуйста, авторизуйтесь
          </Typography>
        </div>

        {serverError && (
          <Typography
            variant="helper"
            color="error"
            align="center"
            className={styles.error}
          >
            {serverError}
          </Typography>
        )}

        <div className={styles.fields}>
          <Input
            label="Логин"
            type="text"
            placeholder=""
            icon={<Icon.User size={20} color={iconColor.gray500} />}
            error={errors.username?.message}
            clearable
            {...register("username")}
          />

          <Input
            label="Пароль"
            type="password"
            placeholder=""
            icon={<Icon.Lock size={20} color={iconColor.gray500} />}
            error={errors.password?.message}
            {...register("password")}
          />
        </div>

        <div className={styles.checkboxWrapper}>
          <Checkbox label="Запомнить данные" {...register("rememberMe")} />
        </div>

        <div className={styles.submit}>
          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            disabled={isSubmitting || isCredentialsBlocked}
          >
            {isSubmitting ?
              "Вход..." :
              isCredentialsBlocked ?
                "Измените данные" :
                "Войти"}
          </Button>
        </div>

        <div className={styles.divider}>
          <Typography variant="bodySmall" color="secondary">
            или
          </Typography>
        </div>

        <div className={styles.footer}>
          <Typography variant="bodySmall" color="secondary">
            Нет аккаунта?
            {" "}

            <Link to="/signup" className={styles.link}>
              Создать
            </Link>
          </Typography>
        </div>
      </div>
    </form>
  );
};
