export interface AddProductFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export interface AddProductFormData {
  article?: string;
  name: string;
  price: number;
  vendor?: string;
}
