export interface Product {
  brand: string;
  category: string;
  description: string;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

export interface ProductsResponse {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}

export interface AddProductRequest {
  brand?: string;
  price: number;
  sku?: string;
  title: string;
}
