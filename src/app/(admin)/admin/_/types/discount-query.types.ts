export type SortBy = "percentage" | "expires_at" | "used_count" | "created_at";

export type DiscountFormData = {
  code: string;
  percentage: number;
  max_usage: number;
  expires_at: Date | string;
};
