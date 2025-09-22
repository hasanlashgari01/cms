"use client";

import { useAuthentication } from "@/hooks/useAuthentication";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignUpSchema } from "../_types/auth.schema";
import { SignUpModel } from "../_types/auth.types";
import AuthForm from "../_components/auth-form";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<SignUpModel>({
    resolver: valibotResolver(SignUpSchema),
  });
  const { signUp } = useAuthentication();

  const onSubmit: SubmitHandler<SignUpModel> = (data) => signUp(data);

  return (
    <AuthForm model="signup">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <input type="email" placeholder="ایمیل" className="auth-input" {...register("email")} />
          <input
            type="password"
            placeholder="رمز عبور"
            className="auth-input"
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
