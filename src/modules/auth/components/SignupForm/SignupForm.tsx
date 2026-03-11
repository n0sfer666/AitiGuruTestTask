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
import { toastSuccess } from "@shared/utils/toast";
import { type FC, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import type { SignupFormData } from "./types";

import styles from "./SignupForm.module.scss";

const signupSchema = z
  .object({
    username: z.string().min(3, "Логин должен быть не менее 3 символов"),
    password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
    confirmPassword: z.string().min(1, "Подтвердите пароль"),
    email: z.string().email("Введите корректный email"),
    firstName: z.string().min(1, "Введите имя"),
    lastName: z.string().min(1, "Введите фамилию"),
    rememberMe: z.boolean().default(false),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

// Cache for storing failed signup attempts (by username:email combination)
const failedSignupCache = new Set<string>();

export const SignupForm: FC = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<null | string>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      firstName: "",
      lastName: "",
      rememberMe: false,
    },
  });

  // Watch form values to detect changes
  // eslint-disable-next-line react-hooks/incompatible-library
  const watchedUsername = watch("username");

  const watchedEmail = watch("email");

  // Check if current signup data matches a failed attempt
  const isSignupBlocked = useMemo(() => {
    const signupKey = `${watchedUsername}:${watchedEmail}`;
    return failedSignupCache.has(signupKey);
  }, [watchedUsername, watchedEmail]);

  const onSubmit = async (data: SignupFormData) => {
    // Clear previous error
    setServerError(null);

    try {
      // 1. Create user via DummyJSON
      await authApi.signup({
        username: data.username,
        password: data.password,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      // Remove from failed cache on success
      const signupKey = `${data.username}:${data.email}`;
      failedSignupCache.delete(signupKey);

      toastSuccess("Аккаунт успешно создан!");

      // 2. Automatically login after successful signup
      const loginResponse = await authApi.login({
        username: data.username,
        password: data.password,
      });

      setToken(loginResponse.accessToken, data.rememberMe);

      const payload = parseJWT(loginResponse.accessToken);

      loginSuccess({
        token: loginResponse.accessToken,
        user: {
          id: loginResponse.id,
          username: loginResponse.username,
          email: loginResponse.email,
          firstName: loginResponse.firstName,
          lastName: loginResponse.lastName,
          image: loginResponse.image,
        },
        rememberMe: data.rememberMe,
        expiresAt: payload?.exp,
      });

      navigate("/products");
    } catch (error) {
      // Handle both Error instances and AppError objects from handleError
      let errorMessage = "Ошибка регистрации";

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

      // Add failed signup to cache
      const signupKey = `${data.username}:${data.email}`;
      failedSignupCache.add(signupKey);
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
            Создание аккаунта
          </Typography>

          <Typography variant="bodySmall" color="secondary" align="center">
            Заполните данные для регистрации
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
          <div className={styles.row}>
            <Input
              label="Имя"
              type="text"
              placeholder=""
              icon={<Icon.User size={20} color={iconColor.gray500} />}
              error={errors.firstName?.message}
              {...register("firstName")}
            />

            <Input
              label="Фамилия"
              type="text"
              placeholder=""
              icon={<Icon.User size={20} color={iconColor.gray500} />}
              error={errors.lastName?.message}
              {...register("lastName")}
            />
          </div>

          <Input
            label="Email"
            type="email"
            placeholder=""
            icon={<Icon.Email size={20} color={iconColor.gray500} />}
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Логин"
            type="text"
            placeholder=""
            icon={<Icon.User size={20} color={iconColor.gray500} />}
            error={errors.username?.message}
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

          <Input
            label="Подтвердите пароль"
            type="password"
            placeholder=""
            icon={<Icon.Lock size={20} color={iconColor.gray500} />}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
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
            disabled={isSubmitting || isSignupBlocked}
          >
            {isSubmitting ?
              "Создание..." :
              isSignupBlocked ?
                "Измените данные" :
                "Создать аккаунт"}
          </Button>
        </div>

        <div className={styles.divider}>
          <Typography variant="bodySmall" color="secondary">
            или
          </Typography>
        </div>

        <div className={styles.footer}>
          <Typography variant="bodySmall" color="secondary">
            Уже есть аккаунт?
            {" "}

            <Link to="/login" className={styles.link}>
              Войти
            </Link>
          </Typography>
        </div>
      </div>
    </form>
  );
};
