import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { getCategoryList } from "../../../_/services/categories";
import ImageUploader from "@/app/_components/image-uploader/image-uploader";
import { uploadImage } from "../../../_/services/products";
import { BeatLoader } from "react-spinners";
import TextField from "@/app/_components/text-field/text-field";
import ListBox from "./list-box";
import { Category } from "@/types/category.types";
import { ProductFormData } from "../../../_/types/product-query.types";
import { Button } from "@headlessui/react";

const CreateProduct: React.FC = () => {
  const {
    register,
    setValue,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<Category | null>(null);

  useEffect(() => {
    getCategoryList()
      .then((data) => setCategories(data || []))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const onSubmit = async (formData: ProductFormData) => {
    const supabase = await createClient();

    let image_url = null;
    if (formData.image_url) {
      image_url = await uploadImage(formData.image_url);
    }

    const { data, error } = await supabase.from("products").insert([
      {
        title: formData.title,
        price: formData.price,
        image_url,
        is_active: formData.is_active,
        category_id: formData.category_id,
      },
    ]);

    if (error) {
      console.error("Error inserting product:", error.message);
    } else {
      console.log("Inserted product:", data);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <Controller
        name="image_url"
        control={control}
        render={({ field }) => (
          <ImageUploader className="h-40 w-64" value={field.value} onChange={field.onChange} />
        )}
      />
      <TextField
        {...register("title", { required: "نام محصول الزامی است" })}
        placeholder="نام محصول"
        error={errors.title?.message}
      />
      <TextField
        type="number"
        {...register("price", {
          required: "قیمت الزامی است",
          min: { value: 1, message: "قیمت باید بیشتر از صفر باشد" },
        })}
        placeholder="قیمت"
        error={errors.price?.message}
      />
      <ListBox
        selected={selected}
        setSelected={setSelected}
        setValue={setValue}
        categories={categories}
      />
      <label className="flex items-center gap-2">
        <input type="checkbox" {...register("is_active")} />
        <span>فعال</span>
      </label>
      <Button type="submit" className="btn">
        {isSubmitting ? <BeatLoader color="white" /> : "ثبت"}
      </Button>
    </form>
  );
};

export default CreateProduct;
