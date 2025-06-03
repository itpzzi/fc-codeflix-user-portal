import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';
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

describe('LoginForm', () => {
  it('deve renderizar todos os elementos do formulário', () => {
    render(<LoginForm />);

    expect(screen.getByRole('heading', { name: 'Sign In' })).toBeInTheDocument();
    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('deve gerenciar mudanças no input de email', () => {
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText('Insert your e-mail');
    fireEvent.change(emailInput, { target: { value: 'test@email.com' } });

    expect(emailInput).toHaveValue('test@email.com');
  });

  it('deve gerenciar mudanças no input de senha', () => {
    render(<LoginForm />);

    const passwordInput = screen.getByPlaceholderText('Enter a strong password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(passwordInput).toHaveValue('password123');
  });

  it('deve submeter o formulário e limpar os inputs', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText('Insert your e-mail');
    const passwordInput = screen.getByPlaceholderText('Enter a strong password');
    const form = screen.getByRole('button', { name: 'Sign In' }).closest('form');

    fireEvent.change(emailInput, { target: { value: 'test@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.submit(form!);

    expect(consoleSpy).toHaveBeenCalledWith('login', {
      email: 'test@email.com',
      password: 'password123'
    });
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');

    consoleSpy.mockRestore();
  });
});