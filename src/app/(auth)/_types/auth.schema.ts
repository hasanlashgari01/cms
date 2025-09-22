import { email, maxLength, minLength, nonEmpty, object, pipe, string, trim } from "valibot";

const EmailSchema = pipe(string(), trim(), email(), nonEmpty());

const PasswordSchema = pipe(
  string(),
  trim(),
  minLength(8, "رمز عبور باید حداقل 8 کاراکتر باشد"),
  maxLength(32, "رمز عبور نباید بیشتر از 32 کاراکتر باشد"),
);

export const SignInSchema = object({
  email: EmailSchema,
  password: PasswordSchema,
});

export const SignUpSchema = object({
  email: EmailSchema,
  password: PasswordSchema,
});
