import { render, screen, fireEvent } from '@testing-library/react';
import RegisterForm from './RegisterForm';
import '@testing-library/jest-dom';
import { ButtonProps } from '@/components/CodeflixButton/CodeflixButton';
import { InputProps } from '@/components/CodeflixInput/CodeflixInput';

jest.mock('@/components/CodeflixInput/CodeflixInput', () => ({
    CodeflixInput: ({ label, value, onChange, placeholder, type }: InputProps) => (
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
    CodeflixButton: ({ children, type }: ButtonProps) => (
        <button type={type}>{children}</button>
    )
}));

describe('RegisterForm', () => {
    it('deve renderizar todos os elementos do formulário', () => {
        render(<RegisterForm />);

        expect(screen.getByRole('heading', { name: 'Sign Up' })).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Lastname')).toBeInTheDocument();
        expect(screen.getByText('E-mail')).toBeInTheDocument();
        expect(screen.getByText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
    });

    it('deve gerenciar mudanças em todos os inputs', () => {
        render(<RegisterForm />);

        const nameInput = screen.getByPlaceholderText('Your first name');
        const lastnameInput = screen.getByPlaceholderText('Your last name');
        const emailInput = screen.getByPlaceholderText('Insert your e-mail');
        const passwordInput = screen.getByPlaceholderText('Enter a strong password');

        fireEvent.change(nameInput, { target: { value: 'John' } });
        fireEvent.change(lastnameInput, { target: { value: 'Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@email.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(nameInput).toHaveValue('John');
        expect(lastnameInput).toHaveValue('Doe');
        expect(emailInput).toHaveValue('john@email.com');
        expect(passwordInput).toHaveValue('password123');
    });

    it('deve submeter o formulário e limpar todos os inputs', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        render(<RegisterForm />);

        const nameInput = screen.getByPlaceholderText('Your first name');
        const lastnameInput = screen.getByPlaceholderText('Your last name');
        const emailInput = screen.getByPlaceholderText('Insert your e-mail');
        const passwordInput = screen.getByPlaceholderText('Enter a strong password');
        const form = screen.getByRole('button', { name: 'Sign Up' }).closest('form');

        fireEvent.change(nameInput, { target: { value: 'John' } });
        fireEvent.change(lastnameInput, { target: { value: 'Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@email.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.submit(form!);

        expect(consoleSpy).toHaveBeenCalledWith('register', {
            email: 'john@email.com',
            password: 'password123',
            name: 'John',
            lastname: 'Doe'
        });

        expect(nameInput).toHaveValue('');
        expect(lastnameInput).toHaveValue('');
        expect(emailInput).toHaveValue('');
        expect(passwordInput).toHaveValue('');

        consoleSpy.mockRestore();
    });

    it('não deve mostrar o link do footer', () => {
        render(<RegisterForm />);

        expect(screen.queryByText('Forgot password?')).not.toBeInTheDocument();
    });
});