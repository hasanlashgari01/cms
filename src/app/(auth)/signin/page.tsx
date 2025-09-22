"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import AuthForm from "../_components/auth-form";
import { SignInModel } from "../_types/auth.types";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { SignInSchema } from "../_types/auth.schema";
import { useAuthentication } from "@/hooks/useAuthentication";

export default function SignInPage() {
  const { register, handleSubmit } = useForm<SignInModel>({
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
          <input type="email" placeholder="ایمیل" className="auth-input" {...register("email")} />
          <input
            type="password"
            placeholder="رمز عبور"
            className="auth-input"
            {...register("password")}
          />
        </div>

        <button type="submit" className="btn-primary mt-6">
          ورود
        </button>
      </form>
    </AuthForm>
  );
}
