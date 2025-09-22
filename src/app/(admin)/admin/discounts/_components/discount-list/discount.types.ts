import { Discount } from "@/types/discount.types";

export type DiscountListProps = {
  discounts: Discount[];
};

export type MenuActions = {
  id: number;
};

export type MenuActionsProps = MenuActions;

export type DiscountItemProps = Discount;
