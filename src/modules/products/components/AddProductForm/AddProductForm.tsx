import type { FC } from "react";

import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { Typography } from "@components/ui/Typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { productsApi } from "@modules/products/api";
import { toastError, toastSuccess } from "@shared/utils/toast";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { AddProductFormData, AddProductFormProps } from "./types";

import styles from "./AddProductForm.module.scss";

const addProductSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  price: z.coerce.number().positive("Цена должна быть положительной"),
  vendor: z.string().optional(),
  article: z.string().optional(),
});

export const AddProductForm: FC<AddProductFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddProductFormData>({
    resolver: zodResolver(addProductSchema),
  });

  const onSubmit = async (data: AddProductFormData) => {
    try {
      await productsApi.addProduct({
        title: data.name,
        price: data.price,
        brand: data.vendor,
        sku: data.article,
      });
      toastSuccess("Товар успешно добавлен");
      onSuccess();
    } catch (error) {
      if (error instanceof Error) {
        toastError(error.message);
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h2">Добавить новый товар</Typography>

      <Input
        label="Название"
        placeholder="Введите название товара"
        error={errors.name?.message}
        {...register("name")}
      />

      <Input
        label="Цена"
        type="number"
        placeholder="Введите цену"
        error={errors.price?.message}
        {...register("price")}
      />

      <Input
        label="Производитель"
        placeholder="Введите производителя (необязательно)"
        error={errors.vendor?.message}
        {...register("vendor")}
      />

      <Input
        label="Артикул"
        placeholder="Введите артикул (необязательно)"
        error={errors.article?.message}
        {...register("article")}
      />

      <div className={styles.actions}>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Отмена
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Добавление..." : "Добавить"}
        </Button>
      </div>
    </form>
  );
};
