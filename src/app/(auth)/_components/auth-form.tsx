"use client";

import Link from "next/link";
import { AuthFormProps } from "../_types/auth-form.types";
import Google from "./google";

const AuthForm: React.FC<AuthFormProps> = ({ children, model }) => {
  const isSignUp = model === "signup";

  return (
    <div className="bg-secondary-100 dark:bg-secondary-600 mx-auto max-w-lg rounded-2xl p-5">
      <h1 className="text-center text-2xl leading-normal font-medium lg:text-[32px] lg:font-semibold dark:text-white">
        {model === "signup" ? "ثبت نام" : "ورود"}
      </h1>
      <div className="mt-6 space-y-6">
        <Google />

        {children}

        <div className="text-center text-sm">
          <span className="text-secondary font-normal">
            {isSignUp ? "قبلا عضو شده‌اید؟" : "عضو نیستید؟"}
          </span>
          <Link
            href={isSignUp ? "/signin" : "/signup"}
            className="text-primary cursor-pointer font-bold dark:text-white"
          >
            {isSignUp ? "رفتن به صفحه ورود" : "ثبت نام کنید"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
