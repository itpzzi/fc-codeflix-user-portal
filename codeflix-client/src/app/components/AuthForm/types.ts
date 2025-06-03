import { FormEvent, ReactNode } from "react";

export interface AuthFormProps {
  title: string;
  headerLink?: {
    text: string;
    linkText: string;
    href: string;
  };
  footerLink?: {
    text: string;
    linkText: string;
    href: string;
  };
  submitButtonText: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  showFooterLink?: boolean;
}