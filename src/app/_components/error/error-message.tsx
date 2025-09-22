import { FC } from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => (
  <div className="box chart-container flex h-[400px] items-center justify-center">
    <div
      className="animate-shake text-xl font-bold"
      style={{
        color: "var(--error-color, oklch(0.5 0.2 25 / 1))",
        backgroundColor: "var(--error-bg-color, oklch(0.95 0.02 25 / 0.1))",
        padding: "1rem 2rem",
        borderRadius: "1rem",
        border: "2px solid var(--error-color, oklch(0.5 0.2 25 / 1))",
        textAlign: "center",
      }}
    >
      {message}
    </div>
  </div>
);

export default ErrorMessage;
