"use client";

import { CodeflixInput } from "@/components/CodeflixInput";
import { FormEvent, useState } from "react";
import { AuthForm } from "@/components/AuthForm";

const REGISTER_STRINGS = {
  title: "Sign Up",
  headerLink: {
    text: "Already have an account?",
    linkText: "Sign in!",
    href: "/auth/login"
  },
  submitButton: "Sign Up",
  nameLabel: "Name",
  namePlaceholder: "Your first name",
  lastnameLabel: "Lastname",
  lastnamePlaceholder: "Your last name",
  emailLabel: "E-mail",
  emailPlaceholder: "Insert your e-mail",
  passwordLabel: "Password",
  passwordPlaceholder: "Enter a strong password"
};

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('register', { email, password, name, lastname });
    setName('');
    setLastname('');
    setEmail('');
    setPassword('');
  };

  return (
    <AuthForm
      title={REGISTER_STRINGS.title}
      headerLink={REGISTER_STRINGS.headerLink}
      submitButtonText={REGISTER_STRINGS.submitButton}
      onSubmit={handleSubmit}
      showFooterLink={false}
    >
      <div className="form-name flex justify-between items-baseline space-x-8">
        <CodeflixInput
          hasError={false}
          label={REGISTER_STRINGS.nameLabel}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={REGISTER_STRINGS.namePlaceholder}
        />

        <CodeflixInput
          hasError={false}
          label={REGISTER_STRINGS.lastnameLabel}
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          placeholder={REGISTER_STRINGS.lastnamePlaceholder}
        />
      </div>

      <CodeflixInput
        hasError={false}
        label={REGISTER_STRINGS.emailLabel}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={REGISTER_STRINGS.emailPlaceholder}
      />

      <CodeflixInput
        hasError={false}
        label={REGISTER_STRINGS.passwordLabel}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={REGISTER_STRINGS.passwordPlaceholder}
      />
    </AuthForm>
  );
}