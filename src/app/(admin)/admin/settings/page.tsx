"use client";

import ImageUploader from "@/app/_components/image-uploader/image-uploader";
import TextField from "@/app/_components/text-field/text-field";
import { useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { uploadAvatar } from "../_/services/s3";
import { getUserDetails, updateUser } from "../../../../services/users";

interface FormData {
  full_name: string;
  email: string;
  avatar_url: string | File | null;
}

const SettingsPage = () => {
  const { register, setValue, handleSubmit, control } = useForm<FormData>({
    mode: "onBlur",
  });
  const [userId, setUserId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getUserDetails().then(({ id, user }) => {
      if (id && user) {
        setUserId(id);
        if (user.full_name) setValue("full_name", user.full_name);
        if (user.email) setValue("email", user.email);
        if (user.avatar_url) setValue("avatar_url", user.avatar_url);
      }
    });
  }, [setValue]);

  const onSubmit = async (data: FormData) => {
    if (!userId) return;

    startTransition(async () => {
      let avatar_url = data.avatar_url;
      if (avatar_url instanceof File) {
        avatar_url = await uploadAvatar(avatar_url, userId);
      }

      await updateUser({
        full_name: data.full_name,
        email: data.email,
        avatar_url: avatar_url ? avatar_url : "",
      });
    });
  };

  return (
    <div className="box h-full p-5">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 lg:w-1/2">
        <Controller
          name="avatar_url"
          control={control}
          render={({ field }) => (
            <ImageUploader
              className="size-24 cursor-pointer"
              value={field.value as File}
              onChange={field.onChange}
            />
          )}
        />
        <div className="space-y-4">
          <TextField {...register("full_name", { minLength: 3 })} placeholder="نام" />
          <TextField {...register("email", { required: true })} placeholder="ایمیل" />
        </div>
        <button
          type="submit"
          className="flex h-12 w-40 cursor-pointer items-center justify-center rounded-xl bg-blue-500 text-white"
        >
          {isPending ? <BeatLoader color="white" /> : "ثبت تغییرات"}
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
