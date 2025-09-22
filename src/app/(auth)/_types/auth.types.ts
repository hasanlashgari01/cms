import { InferOutput } from "valibot";
import { SignInSchema, SignUpSchema } from "./auth.schema";

export type SignUpModel = InferOutput<typeof SignUpSchema>;

export type SignInModel = InferOutput<typeof SignInSchema>;
