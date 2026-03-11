import { api } from "@shared/api/client";
import { handleError } from "@shared/utils/errorHandler";

import type { AddProductRequest, Product, ProductsResponse } from "./types";

interface GetProductsParams {
  limit?: number;
  skip?: number;
}

export const productsApi = {
  getProducts: async (
    params?: GetProductsParams,
  ): Promise<ProductsResponse> => {
    try {
      const searchParams = params ?
        { limit: params.limit, skip: params.skip } :
        undefined;
      return await api.get("products", { searchParams }).json();
    } catch (error) {
      throw await handleError(error, "products");
    }
  },

  searchProducts: async (
    query: string,
    params?: GetProductsParams,
  ): Promise<ProductsResponse> => {
    try {
      const searchParams: Record<string, number | string | undefined> = {
        q: query,
      };
      if (params?.limit) {
        searchParams.limit = params.limit;
      }
      if (params?.skip) {
        searchParams.skip = params.skip;
      }

      return await api.get("products/search", { searchParams }).json();
    } catch (error) {
      throw await handleError(error, "products");
    }
  },

  sortProducts: async (
    sortBy: string,
    order: "asc" | "desc",
    params?: GetProductsParams,
  ): Promise<ProductsResponse> => {
    try {
      const searchParams: Record<string, number | string | undefined> = {
        sortBy,
        order,
      };
      if (params?.limit) {
        searchParams.limit = params.limit;
      }
      if (params?.skip) {
        searchParams.skip = params.skip;
      }

      return await api.get("products", { searchParams }).json();
    } catch (error) {
      throw await handleError(error, "products");
    }
  },

  addProduct: async (product: AddProductRequest): Promise<Product> => {
    try {
      return await api.post("products/add", { json: product }).json();
    } catch (error) {
      throw await handleError(error, "products");
    }
  },
};
