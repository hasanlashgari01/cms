"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import AuthForm from "../_components/auth-form";
import { SignInModel } from "../_types/auth.types";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { SignInSchema } from "../_types/auth.schema";
import { useAuthentication } from "@/hooks/useAuthentication";
import TextField from "@/app/_components/text-field/text-field";

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<SignInModel>({
    resolver: valibotResolver(SignInSchema),
  });
  const { signIn } = useAuthentication();

  const onSubmitSignin: SubmitHandler<SignInModel> = (data) => {
    signIn(data);
  };

  return (
    <AuthForm model="signin">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmitSignin)}>
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
          ورود
        </button>
      </form>
    </AuthForm>
  );
}
