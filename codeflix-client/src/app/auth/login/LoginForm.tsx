"use client";

import { CodeflixInput } from "@/components/CodeflixInput";
import { FormEvent, useState } from "react";
import { AuthForm } from "@/components/AuthForm";

const LOGIN_STRINGS = {
  title: "Sign In",
  headerLink: {
    text: "Does not have an account?",
    linkText: "Sign up!",
    href: "/auth/register"
  },
  footerLink: {
    text: "Forgot your password?",
    linkText: "Try to reset now!",
    href: "/auth/forgot-password"
  },
  submitButton: "Sign In",
  emailLabel: "E-mail",
  emailPlaceholder: "Insert your e-mail",
  passwordLabel: "Password",
  passwordPlaceholder: "Enter a strong password"
};

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('login', { email, password });
    setEmail('');
    setPassword('');
  };

  return (
    <AuthForm
      title={LOGIN_STRINGS.title}
      headerLink={LOGIN_STRINGS.headerLink}
      footerLink={LOGIN_STRINGS.footerLink}
      submitButtonText={LOGIN_STRINGS.submitButton}
      onSubmit={handleSubmit}
    >
      <CodeflixInput
        hasError={false}
        label={LOGIN_STRINGS.emailLabel}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={LOGIN_STRINGS.emailPlaceholder}
      />

      <CodeflixInput
        hasError={false}
        label={LOGIN_STRINGS.passwordLabel}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={LOGIN_STRINGS.passwordPlaceholder}
      />
    </AuthForm>
  );
}