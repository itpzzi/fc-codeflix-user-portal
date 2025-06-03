import { render, screen, fireEvent } from '@testing-library/react';
import ForgotPasswordForm from './ForgetPasswordForm';
import "@testing-library/jest-dom";

jest.mock('@/components/CodeflixInput/CodeflixInput', () => ({
  CodeflixInput: ({ label, value, onChange, placeholder, type }: any) => (
    <div>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}));

jest.mock('@/components/CodeflixButton/CodeflixButton', () => ({
  CodeflixButton: ({ children, type }: any) => (
    <button type={type}>{children}</button>
  )
}));

describe('ForgotPasswordForm', () => {
  it('deve renderizar os elementos do formulário', () => {
    render(<ForgotPasswordForm />);

    expect(screen.getByRole('heading', { name: 'Forgot Password' })).toBeInTheDocument();
    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('deve gerenciar mudanças no input de email', () => {
    render(<ForgotPasswordForm />);

    const emailInput = screen.getByPlaceholderText('Insert your e-mail');
    fireEvent.change(emailInput, { target: { value: 'test@email.com' } });

    expect(emailInput).toHaveValue('test@email.com');
  });
});