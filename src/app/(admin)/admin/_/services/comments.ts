import { Comment } from "@/types/comment.types";
import { createClient } from "@/utils/supabase/client";

type Comments = {
  page?: number;
  limit?: number;
  sortBy?: "created_at";
};

const getComments = async ({ page = 1, limit = 10, sortBy = "created_at" }: Comments) => {
  const supabase = await createClient();

  if (isNaN(page) || page <= 0) page = 1;
  if (isNaN(limit) || limit <= 0) limit = 10;

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const query = supabase
    .from("comments")
    .select(`*, user:user_id (id, full_name, email), product:product_id (id, title)`, {
      count: "exact",
    })
    .range(from, to);

  if (["created_at"].includes(sortBy)) {
    query.order(sortBy, { ascending: false });
  }

  const response = await query.throwOnError();

  const totalPages = Math.ceil(response.count! / limit);

  return {
    ...response,
    totalPages,
  };
};

const getLatestComments = async () => {
  const supabase = await createClient();

  const response = supabase
    .from("comments")
    .select(`*, user:user_id (id, full_name, email), product:product_id (id, title)`, {
      count: "exact",
    })
    .range(1, 5)
    .throwOnError()
    .overrideTypes<Array<Comment>>();

  return response;
};

export { getComments, getLatestComments };
