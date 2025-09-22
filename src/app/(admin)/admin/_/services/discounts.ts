import { createClient } from "@/utils/supabase/client";
import { DiscountFormData, SortBy } from "../types/discount-query.types";

type Discounts = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: SortBy;
};

const getDiscounts = async ({ page = 1, limit = 10, search, sortBy = "created_at" }: Discounts) => {
  const supabase = await createClient();

  if (isNaN(page) || page <= 0) page = 1;
  if (isNaN(limit) || limit <= 0) limit = 10;

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase.from("discounts").select(`*`, { count: "exact" }).range(from, to);

  if (search) query = query.ilike("code", `%${search}%`);
  if (["percentage", "expires_at", "used_count", "created_at"].includes(sortBy)) {
    let ascending = false;

    if (["expires_at"].includes(sortBy)) ascending = true;
    query.order(sortBy, { ascending });
  }

  const response = await query.throwOnError();

  const totalPages = Math.ceil(response.count! / limit);

  return {
    ...response,
    totalPages,
  };
};

const getDiscountItem = async (id: number) => {
  const supabase = await createClient();
  const { data } = await supabase.from("discounts").select("*").eq("id", id).single();

  return data;
};

const updateDiscount = async (id: number, newData: DiscountFormData) => {
  const supabase = await createClient();
  const { status, error } = await supabase.from("discounts").update(newData).eq("id", id);

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return status;
};

const deleteDiscount = async (id: number) => {
  const supabase = await createClient();

  const { status, error } = await supabase.from("discounts").delete().eq("id", id);

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }
  return status;
};

export { getDiscounts, getDiscountItem, updateDiscount, deleteDiscount };
