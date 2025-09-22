export type SortBy = "price" | "views" | "created_at";

export type ProductFormData = {
  title: string;
  price: number | null;
  image_url: File | null;
  is_active?: boolean;
  category_id: number;
};
