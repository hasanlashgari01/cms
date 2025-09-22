import ImageUploader from "@/app/_components/image-uploader/image-uploader";
import TextField from "@/app/_components/text-field/text-field";
import { Category } from "@/types/category.types";
import { useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { useUpdateModal } from "../../../_/providers/modal-provider";
import { getCategories } from "../../../_/services/categories";
import { getProductItem, updateProduct } from "../../../_/services/products";
import { ProductFormData } from "../../../_/types/product-query.types";
import ListBox from "./list-box";

const ProductForm = () => {
  const { id, closeUpdateModal } = useUpdateModal();
  const { register, control, setValue, handleSubmit } = useForm<ProductFormData>({
    mode: "onBlur",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<Category | null>(null);

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: ProductFormData) => {
    startTransition(async () => {
      const status = await updateProduct(id as number, data);
      if (status == 204) {
        closeUpdateModal();
      }
    });
  };

  useEffect(() => {
    Promise.all([getCategories(), getProductItem(id as number)]).then(
      ([categoriesData, productData]) => {
        if (categoriesData) setCategories(categoriesData);
        if (productData) {
          setValue("title", productData.title);
          setValue("price", productData.price);
          setValue("category_id", productData.category_id);
          setValue("image_url", productData.image_url);
          const selectedCategory = categoriesData?.find((c) => c.id === productData.category_id);
          setSelected(selectedCategory || null);
        }
      },
    );
  }, [id, setValue]);

  return (
    <form
      className="w-96 space-y-6 rounded-lg bg-white px-10 py-8 dark:bg-gray-800"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="image_url"
        control={control}
        render={({ field }) => (
          <ImageUploader className="h-32 w-64" value={field.value} onChange={field.onChange} />
        )}
      />
      <TextField
        {...register("title", { required: "نام محصول الزامی است", maxLength: 100 })}
        placeholder="نام محصول"
      />
      <TextField
        type="text"
        {...register("price", {
          required: "قیمت محصول الزامی است",
          min: { value: 0, message: "قیمت نمی‌تواند منفی باشد" },
        })}
        placeholder="قیمت محصول"
      />
      {selected && (
        <ListBox
          selected={selected}
          setSelected={setSelected}
          setValue={setValue}
          categories={categories}
        />
      )}
      <button
        type="submit"
        className="block w-32 cursor-pointer rounded-lg border bg-amber-600 py-2 text-white hover:bg-amber-500"
      >
        {isPending ? "در حال پردازش..." : "ویرایش"}
      </button>
    </form>
  );
};

export default ProductForm;
