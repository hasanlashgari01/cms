import { Tables } from "./database.types";

type Category = {
  id: number;
  title: string;
};

export type Product = Tables<"products"> & {
  category: Category;
};
