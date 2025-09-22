import { Tables } from "./database.types";

export type Comment = Tables<"comments"> & {
  product: {
    id: number;
    title: string;
  };
  user: {
    id: number;
    full_name: string;
    email: string;
  };
};
