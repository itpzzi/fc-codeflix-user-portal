"use client";

import { CodeflixInput } from "@/components/CodeflixInput";
import { FormEvent, useState } from "react";
import { AuthForm } from "@/components/AuthForm";
import { ZodError } from 'zod';
import { LoginSchema } from "@/lib/validations/LoginSchema";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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

/**
 * Converte um ZodError em uma string legível, separando os erros por ponto e vírgula.
 *
 * @param {ZodError} zodError - Instância de erro retornada por Zod.
 * @returns {string} Erros formatados no padrão "{path}: {message}; ..."
 *
 * @example
 * try {
 *   schema.parse(data);
 * } catch (err) {
 *   if (err instanceof ZodError) {
 *     const msg = parseZodErrors(err);
 *     console.log(msg);
 *     // Exemplo de saída: "password: Password must be at least 12 characters long"
 *   }
 * }
 */
const parseZodErrors = (zodError: ZodError): string => {
  return zodError.errors
    .map(e => `${e.path.join('.')}: ${e.message}`)
    .join('; ');
};

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const clearFields = () => {
    setEmail('');
    setPassword('');
  };

  const validateSchema = () => {
    LoginSchema.parse({
      email,
      password,
    });
  }

  const tryToLoginOrThrow = async () => {
    const response = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (response?.ok) {
      router.push('/home');
    } else {
      throw new Error('Login failed');
    }
  };

  const handleErrorOrThrow = (error: Error) => {
    if (error instanceof ZodError) {
      const errorMessages = parseZodErrors(error);
      setErrors(errorMessages);
    } else {
      throw error;
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      validateSchema()
      await tryToLoginOrThrow();
    } catch (error: any) {
      handleErrorOrThrow(error);
    } finally {
      setIsLoading(false);
      clearFields();
    }
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

      {errors && (
        <div className="flex justify-center items-center">
          {errors.split(";").map((error) => (<p className="text-red-300 font-bold">{error}</p>))}
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center">
          <div className="animate-pulse w-16 h-16 bg-gray-300 rounded" /> Aguarde...
        </div>
      )}

    </AuthForm>
  );
}