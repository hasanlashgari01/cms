import { User } from "@/types/user.types";
import { createClient } from "@/utils/supabase/client";

type Users = {
  page?: number;
  limit?: number;
  search: string | null;
  role: User["role"] | "all";
};

const getUsers = async ({ page = 1, limit = 10, search, role = "all" }: Users) => {
  const supabase = await createClient();

  if (isNaN(page) || page <= 0) page = 1;
  if (isNaN(limit) || limit <= 0) limit = 10;

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase.from("users").select(`*`, { count: "exact" }).range(from, to);

  if (search) {
    query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
  }
  if (role !== "all") query = query.eq("role", role);

  const response = await query.throwOnError().overrideTypes<Array<User>>();

  const totalPages = Math.ceil(response.count! / limit);

  return {
    ...response,
    totalPages,
  };
};

const getUserDetails = async () => {
  const supabase = await createClient();
  const { data: sesstionData } = await supabase.auth.getSession();
  const userId = sesstionData.session?.user.id;
  if (!userId) return { id: null, user: null };

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single<User>();

  if (error) {
    console.error("Error fetching user row:", error);
    return {
      id: userId,
      user: null,
    };
  }

  return {
    id: userId,
    user,
  };
};

const updateUser = async (newData: { full_name: string; email: string; avatar_url: string }) => {
  const supabase = await createClient();
  const { status, error } = await supabase
    .from("users")
    .update(newData)
    .eq("id", (await supabase.auth.getUser()).data.user?.id); // از سشن فعلی بگیر

  if (error) {
    console.error("Error updating user:", error);
    return null;
  }

  return status;
};

const getUserByDate = async (day = 7) => {
  const supabase = await createClient();

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - day);

  const endDate = new Date();
  endDate.setDate(endDate.getDate());

  const response = await supabase
    .from("users")
    .select(`created_at`, { count: "exact" })
    .gte("created_at", startDate.toISOString())
    .lte("created_at", endDate.toISOString());

  const { data } = await supabase.rpc("get_monthly_users");

  return { data, response };
};

export { getUsers, getUserDetails, updateUser, getUserByDate };
