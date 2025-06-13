import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export function CodeflixButton({
  loading = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={clsx(
        "px-6 py-2 font-semibold rounded-full transition-all duration-200",
        "bg-white text-black",
        "hover:scale-105 hover:brightness-110",
        "focus:outline-none focus:ring-2 focus:ring-[var(--color-codeflix-red)]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {loading ? "Carregando..." : children}
    </button>
  );
}
