import { CodeflixButton } from "@/components/CodeflixButton";
import { AuthFormProps } from "./types";

export function AuthForm({
  title,
  headerLink,
  footerLink,
  submitButtonText,
  onSubmit,
  children,
  showFooterLink = true
}: AuthFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="glass-surface flex flex-col space-y-8 bg-black/75 rounded-2xl p-6"
      aria-labelledby="login-heading"
    >
      <div className="form-header flex justify-between items-baseline space-x-8">
        <h2 id="login-heading" className="form-title text-2xl font-bold">{title}</h2>

        {headerLink && (
          <div className="form-already-have-account flex flex-col items-baseline justify-start text-xs">
            <div className="font-bold text-white">
              {headerLink.text} <a href={headerLink.href} className="text-red-500">{headerLink.linkText}</a>
            </div>
          </div>
        )}
      </div>

      <div className="form-content flex flex-col space-y-6">
        {children}
      </div>

      <div className="form-actions flex justify-between items-baseline">
        {showFooterLink && footerLink && (
          <div className="text-xs text-white font-bold">
            {footerLink.text} <a href={footerLink.href} className="text-red-500">{footerLink.linkText}</a>
          </div>
        )}
        <div className={!showFooterLink || !footerLink ? "ml-auto" : ""}>
          <CodeflixButton type="submit">
            {submitButtonText}
          </CodeflixButton>
        </div>
      </div>
    </form>
  );
}