"use client";

import { CodeflixInput } from "@/components/CodeflixInput";
import { FormEvent, useState } from "react";
import { AuthForm } from "@/components/AuthForm";

const FORGOT_PASSWORD_STRINGS = {
  title: "Forgot Password",
  headerLink: {
    text: "Have you remmember your password?",
    linkText: "Sign in!",
    href: "/auth/login"
  },
  footerLink: {
    text: "Create another account?",
    linkText: "Try to reset now!",
    href: "/auth/register"
  },
  submitButton: "Sign In",
  emailLabel: "E-mail",
  emailPlaceholder: "Insert your e-mail"
};

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('forgot-password', { email });
    setEmail('');
  };

  return (
    <AuthForm
      title={FORGOT_PASSWORD_STRINGS.title}
      headerLink={FORGOT_PASSWORD_STRINGS.headerLink}
      footerLink={FORGOT_PASSWORD_STRINGS.footerLink}
      submitButtonText={FORGOT_PASSWORD_STRINGS.submitButton}
      onSubmit={handleSubmit}
    >
      <CodeflixInput
        hasError={false}
        label={FORGOT_PASSWORD_STRINGS.emailLabel}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={FORGOT_PASSWORD_STRINGS.emailPlaceholder}
      />
    </AuthForm>
  );
}