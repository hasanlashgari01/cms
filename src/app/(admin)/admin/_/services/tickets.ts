import { createClient } from "@/utils/supabase/client";

type Tickets = {
  page?: number;
  limit?: number;
  search?: string;
};

const getTickets = async ({ page = 1, limit = 10, search }: Tickets) => {
  const supabase = await createClient();

  if (isNaN(page) || page <= 0) page = 1;
  if (isNaN(limit) || limit <= 0) limit = 10;

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase.from("tickets").select(`*`, { count: "exact" }).range(from, to);

  if (search) query = query.ilike("code", `%${search}%`);

  const response = await query.throwOnError();

  const totalPages = Math.ceil(response.count! / limit);

  return {
    ...response,
    totalPages,
  };
};

const getDiscountItem = async (id: number) => {
  const supabase = await createClient();
  const { data } = await supabase.from("tickets").select("*").eq("id", id).single();

  return data;
};

/* const updateDiscount = async (id: number) => {
  const supabase = await createClient();
  const { status, error } = await supabase.from("tickets").update(newData).eq("id", id);

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return status;
};
 */

const deleteDiscount = async (id: number) => {
  const supabase = await createClient();

  const { status, error } = await supabase.from("tickets").delete().eq("id", id);

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }
  return status;
};

export { deleteDiscount, getDiscountItem, getTickets };
