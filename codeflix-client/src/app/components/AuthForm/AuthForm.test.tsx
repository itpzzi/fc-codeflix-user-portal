import { render, screen, fireEvent } from '@testing-library/react';
import { AuthForm } from './AuthForm';
import "@testing-library/jest-dom"
import { ButtonProps } from '@/components/CodeflixButton/CodeflixButton';

jest.mock('@/components/CodeflixButton/CodeflixButton', () => ({
  CodeflixButton: ({ children, type, ...props }: ButtonProps) => (
    <button type={type} {...props}>{children}</button>
  )
}));

const mockProps = {
  title: "Test Form",
  headerLink: {
    text: "Don't have account?",
    linkText: "Sign up!",
    href: "/register"
  },
  footerLink: {
    text: "Forgot password?",
    linkText: "Reset now!",
    href: "/forgot"
  },
  submitButtonText: "Submit",
  onSubmit: jest.fn()
};

describe('AuthForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o título corretamente', () => {
    render(
      <AuthForm {...mockProps}>
        <div>Test Content</div>
      </AuthForm>
    );

    expect(screen.getByText('Test Form')).toBeInTheDocument();
  });

  it('deve renderizar o link do header quando fornecido', () => {
    render(
      <AuthForm {...mockProps}>
        <div>Test Content</div>
      </AuthForm>
    );

    expect(screen.getByText("Don't have account?")).toBeInTheDocument();
    expect(screen.getByText('Sign up!')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign up!' })).toHaveAttribute('href', '/register');
  });

  it('não deve renderizar o link do header quando não fornecido', () => {
    const propsWithoutHeader = { ...mockProps, headerLink: undefined };
    
    render(
      <AuthForm {...propsWithoutHeader}>
        <div>Test Content</div>
      </AuthForm>
    );

    expect(screen.queryByText("Don't have account?")).not.toBeInTheDocument();
  });

  it('deve renderizar o link do footer quando fornecido e showFooterLink é true', () => {
    render(
      <AuthForm {...mockProps}>
        <div>Test Content</div>
      </AuthForm>
    );

    expect(screen.getByText('Forgot password?')).toBeInTheDocument();
    expect(screen.getByText('Reset now!')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Reset now!' })).toHaveAttribute('href', '/forgot');
  });

  it('não deve renderizar o link do footer quando showFooterLink é false', () => {
    render(
      <AuthForm {...mockProps} showFooterLink={false}>
        <div>Test Content</div>
      </AuthForm>
    );

    expect(screen.queryByText('Forgot password?')).not.toBeInTheDocument();
  });

  it('deve renderizar o conteúdo dos children', () => {
    render(
      <AuthForm {...mockProps}>
        <div>Custom Content</div>
        <input placeholder="test input" />
      </AuthForm>
    );

    expect(screen.getByText('Custom Content')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('test input')).toBeInTheDocument();
  });

  it('deve renderizar o botão de submit com o texto correto', () => {
    render(
      <AuthForm {...mockProps}>
        <div>Test Content</div>
      </AuthForm>
    );

    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toHaveAttribute('type', 'submit');
  });

  it('deve chamar onSubmit quando o formulário é submetido', () => {
    render(
      <AuthForm {...mockProps}>
        <div>Test Content</div>
      </AuthForm>
    );

    const form = screen.getByRole('button', { name: 'Submit' }).closest('form');
    fireEvent.submit(form!);

    expect(mockProps.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('deve aplicar as classes CSS corretas', () => {
    render(
      <AuthForm {...mockProps}>
        <div>Test Content</div>
      </AuthForm>
    );

    const form = screen.getByRole('button', { name: 'Submit' }).closest('form');
    expect(form).toHaveClass('glass-surface', 'flex', 'flex-col', 'space-y-8', 'bg-black/75', 'rounded-2xl', 'p-6');
  });

  it('deve alinhar o botão submit à direita quando não há footer link', () => {
    render(
      <AuthForm {...mockProps} showFooterLink={false}>
        <div>Test Content</div>
      </AuthForm>
    );

    const buttonContainer = screen.getByRole('button', { name: 'Submit' }).parentElement;
    expect(buttonContainer).toHaveClass('ml-auto');
  });
});