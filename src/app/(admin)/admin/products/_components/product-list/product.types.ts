import { Product } from "@/types/product.types";

export type ProductListProps = {
  products: Product[];
  totalPages: number;
  page: number;
};

export type MenuActions = {
  id: string | number;
};

export type MenuActionsProps = MenuActions;

export type ProductItemProps = Product;
