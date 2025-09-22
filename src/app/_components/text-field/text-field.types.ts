import { SVGProps } from "react";

export type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ComponentType<SVGProps<SVGSVGElement>>;
  error?: string;
};
