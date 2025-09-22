import { Product } from "@/types/product.types";
import { client } from "@/utils/supabase/server";
import Image from "next/image";

export default async function Home() {
  const supabase = await client();
  const { data: products } = await supabase
    .from("products")
    .select(`*, category:category_id (id, title)`)
    .eq("is_active", true)
    .overrideTypes<Product[]>();

  return (
    <>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-8 px-8 my-20 xl:px-16 xl:grid-cols-4">
        {products?.map((product) => (
          <div key={product.id} className="w-full rounded-xl bg-white dark:bg-slate-800 p-6">
            <div className="flex-center mx-auto max-h-32 min-h-32 px-2 lg:w-64">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.title}
                  width={100}
                  height={100}
                  className="size-full object-cover"
                />
              ) : (
                <div className="h-32 w-full rounded-2xl bg-gray-100"></div>
              )}
            </div>
            <div className="mt-8 flex justify-between xs:flex-col lg:flex-row">
              <div>
                <h3>{product.title}</h3>
                <h4 className="text-secondary-300 text-sm">{product.category.title}</h4>
              </div>
              <div className="self-end">
                <h3 className="text-sm">{product.price.toLocaleString()} $</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
