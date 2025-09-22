import { Product } from "@/types/product.types";
import { createClient } from "@/utils/supabase/client";
import { SortBy, ProductFormData } from "../types/product-query.types";

type Products = {
  page?: number;
  limit?: number;
  search: string | null;
  sortBy?: SortBy;
  ascending?: boolean;
};

const getProducts = async ({ page = 1, limit = 10, search, sortBy = "created_at" }: Products) => {
  const supabase = await createClient();

  if (isNaN(page) || page <= 0) page = 1;
  if (isNaN(limit) || limit <= 0) limit = 10;

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("products")
    .select(`*, category:category_id (id, title)`, { count: "exact" })
    .range(from, to);

  if (search) query = query.ilike("title", `%${search}%`);
  if (["price", "views", "created_at"].includes(sortBy)) {
    let ascending = false;

    if (["price", "views"].includes(sortBy)) {
      ascending = false;
    }

    query.order(sortBy, { ascending });
  }

  const response = await query.throwOnError().overrideTypes<Array<Product>>();

  const totalPages = Math.ceil(response.count! / limit);

  return {
    ...response,
    totalPages,
  };
};

const getLatestProducts = async () => {
  const supabase = await createClient();

  const response = supabase
    .from("products")
    .select(`*, category:category_id (id, title)`)
    .range(1, 5)
    .throwOnError()
    .overrideTypes<Array<Product>>();

  return response;
};

const getProductItem = async (id: number) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }
  return data;
};

const updateProduct = async (id: number, newData: ProductFormData) => {
  const supabase = await createClient();
  const { status, error } = await supabase.from("products").update(newData).eq("id", id);

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return status;
};

const updateProductStatus = async (id: number, is_active: boolean) => {
  const supabase = await createClient();
  const { status, error } = await supabase.from("products").update({ is_active }).eq("id", id);

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return status;
};

const deleteProduct = async (id: number) => {
  const supabase = await createClient();

  const { status, error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }
  return status;
};

export const uploadImage = async (file: File) => {
  const supabase = await createClient();

  const filePath = `products/${Date.now()}.${file.name.split(".").pop()}`;

  const { error } = await supabase.storage.from("images").upload(filePath, file, {
    cacheControl: "3600",
    upsert: true,
  });

  if (error) {
    console.error("Error uploading file:", error.message);
    return null;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("images").getPublicUrl(filePath);

  return publicUrl;
};

export {
  getProducts,
  getLatestProducts,
  getProductItem,
  updateProduct,
  updateProductStatus,
  deleteProduct,
};
