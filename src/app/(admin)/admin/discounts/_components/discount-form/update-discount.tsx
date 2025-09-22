import TextField from "@/app/_components/text-field/text-field";
import { Button } from "@headlessui/react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import { BeatLoader } from "react-spinners";
import { DiscountFormData } from "../../../_/types/discount-query.types";
import { getDiscountItem, updateDiscount } from "../../../_/services/discounts";
import { useUpdateModal } from "../../../_/providers/modal-provider";
import { useEffect } from "react";
import { jalaliDate } from "@/utils/date";

const UpdateDiscount = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DiscountFormData>();
  const { id } = useUpdateModal();

  const onSubmit = async (formData: DiscountFormData) => {
    updateDiscount(id as number, formData).then(() => {
      reset();
    });
  };

  useEffect(() => {
    getDiscountItem(id as number).then((data) => {
      if (data) {
        setValue("code", data.code);
        setValue("percentage", data.percentage);
        setValue("max_usage", data.max_usage);
        setValue("expires_at", jalaliDate(data.expires_at));
      }
    });
  }, [id, setValue]);

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
              value={field.value}
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
        {isSubmitting ? <BeatLoader color="white" /> : "ویرایش"}
      </Button>
    </form>
  );
};

export default UpdateDiscount;
