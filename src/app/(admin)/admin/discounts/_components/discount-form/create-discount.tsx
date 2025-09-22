import TextField from "@/app/_components/text-field/text-field";
import { Controller, useForm } from "react-hook-form";
import { DiscountFormData } from "../../../_/types/discount-query.types";
import { Button } from "@headlessui/react";
import { BeatLoader } from "react-spinners";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { createClient } from "@/utils/supabase/client";

const CreateDiscount = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DiscountFormData>();

  const onSubmit = async (formData: DiscountFormData) => {
    console.log(formData);

    const supabase = await createClient();

    const { data } = await supabase.from("discounts").insert([
      {
        code: formData.code,
        percentage: formData.percentage,
        max_usage: formData.max_usage,
        expires_at: formData.expires_at,
      },
    ]);

    if (data) {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <TextField
        {...register("code", { required: "کد تخفیف الزامی است" })}
        placeholder="کد تخفیف"
        error={errors.code?.message}
      />
      <TextField
        {...register("percentage", {
          required: "درصد تخفیف الزامی است",
          min: { value: 1, message: "درصد باید حداقل ۱ باشد" },
          max: { value: 100, message: "درصد نمی‌تواند بیشتر از ۱۰۰ باشد" },
        })}
        placeholder="درصد تخفیف (۱ تا ۱۰۰)"
        error={errors.percentage?.message}
      />

      <TextField
        {...register("max_usage", {
          required: "حداکثر تعداد استفاده الزامی است",
          min: { value: 1, message: "حداقل تعداد باید ۱ باشد" },
        })}
        placeholder="حداکثر تعداد استفاده"
        error={errors.max_usage?.message}
      />

      <div>
        <Controller
          control={control}
          name="expires_at"
          rules={{ required: "تاریخ انقضا الزامی است" }}
          render={({ field }) => (
            <DatePicker
              value={field.value || ""}
              onChange={(date) => field.onChange(date?.toDate?.().toISOString())}
              calendar={persian}
              locale={persian_fa}
              inputClass="auth-input"
              containerClassName="w-full"
              placeholder="تاریخ انقضا"
            />
          )}
        />
        {errors.expires_at && <p className="text-sm text-red-500">{errors.expires_at.message}</p>}
      </div>

      <Button type="submit" className="btn">
        {isSubmitting ? <BeatLoader color="white" /> : "ثبت"}
      </Button>
    </form>
  );
};

export default CreateDiscount;
