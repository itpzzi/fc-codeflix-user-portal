import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'
import { SearchBar } from './SearchBar';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom'



jest.mock('next/navigation', () => {
    return {
        useRouter: jest.fn()
    };
});

describe('SearchBar', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('renderiza corretamente com valores padrão e não dispara pesquisa vazia', () => {
        const pushMock = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
        const mockIcon = <svg data-testid="icon" />;
        const mockLabel = "Busca";

        render(<SearchBar icon={mockIcon} label={mockLabel} />);

        const iconElement = screen.getByTestId('icon');
        const labelElement = screen.getByLabelText("Busca")
        const formElement = screen.getByRole("searchbox");

        fireEvent.submit(formElement);

        expect(iconElement).toBeInTheDocument();
        expect(labelElement).toBeInTheDocument();
        expect(pushMock).not.toHaveBeenCalled();

    })

    it('renderiza corretamente com valores preenchidos e dispara pesquisa', () => {
        const pushMock = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

        const mockIcon = <svg data-testid="icon" />;
        const mockLabel = "Busca";
        const mockPlaceholder = 'Buscar aqui...';
        const mockQuery = 'teste de string & especial';
        const mockRouteBase = '/pesquisar';
        
        render(<SearchBar icon={mockIcon} label={mockLabel} placeholder={mockPlaceholder} initialQuery={mockQuery} routeBase={mockRouteBase} />);
        
        const queryEncoded = encodeURIComponent(mockQuery);
        const inputElement = screen.getByPlaceholderText(mockPlaceholder);
        const formElement = screen.getByRole("searchbox");

        fireEvent.change(inputElement, { target: { value: mockQuery }});
        fireEvent.submit(formElement);

        expect(pushMock).toHaveBeenCalledWith(`${mockRouteBase}?q=${queryEncoded}`);

    });
})
