import { Category } from "@/types/category.types";
import { createClient } from "@/utils/supabase/client";

const getCategories = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select(`*`)
    .overrideTypes<Array<Category>>();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }
  return data;
};

const getCategoryList = async () => {
  const supabase = await createClient();

  const { data } = await supabase.from("categories").select("*");

  return data;
};

export { getCategories, getCategoryList };
