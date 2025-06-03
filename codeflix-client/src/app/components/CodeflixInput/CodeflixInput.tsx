import { InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | ReactNode;
  id?: string;
  hasError?: boolean;
}

export function CodeflixInput({ label, id, hasError = false, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full text-left">
      {label && (
        <label
          htmlFor={id}
          className="text-lg sr-only font-semibold text-[color:var(--color-codeflix-light)]"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        {...props}
        className={clsx(
          "px-4 py-2 w-full rounded-[var(--radius-md)] border transition-colors",
          "bg-[color:var(--glass-bg)] text-[color:var(--color-codeflix-light)] placeholder:text-[color:var(--color-codeflix-light)]/60",
          hasError
            ? "border-[var(--color-codeflix-red)] focus:ring-2 focus:ring-[var(--color-codeflix-red)]"
            : "border-[var(--glass-border)] focus:ring-2 focus:ring-[var(--glass-highlight)]",
          "focus:outline-none",
          className
        )}
      />
    </div>
  );
}
