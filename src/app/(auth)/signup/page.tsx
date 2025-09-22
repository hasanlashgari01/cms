"use client";

import { useAuthentication } from "@/hooks/useAuthentication";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignUpSchema } from "../_types/auth.schema";
import { SignUpModel } from "../_types/auth.types";
import AuthForm from "../_components/auth-form";
import TextField from "@/app/_components/text-field/text-field";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<SignUpModel>({
    resolver: valibotResolver(SignUpSchema),
  });
  const { signUp } = useAuthentication();

  const onSubmit: SubmitHandler<SignUpModel> = (data) => signUp(data);

  return (
    <AuthForm model="signup">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <TextField
            type="email"
            placeholder="ایمیل"
            className="auth-input"
            error={errors.email?.message && "ایمیل صحیح نیست"}
            {...register("email")}
          />
          <TextField
            type="password"
            placeholder="رمز عبور"
            className="auth-input"
            error={errors.password?.message}
            {...register("password")}
          />
        </div>

        <button type="submit" className="btn-primary mt-6" disabled={!isValid}>
          ثبت نام
        </button>
      </form>
    </AuthForm>
  );
}
