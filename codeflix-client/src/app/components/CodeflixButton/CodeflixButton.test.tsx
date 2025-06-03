import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CodeflixButton } from './CodeflixButton';
import '@testing-library/jest-dom';

describe('CodeflixButton', () => {
  it('renderiza com o texto fornecido', () => {
    render(<CodeflixButton>Entrar</CodeflixButton>);
    expect(screen.getByRole('button')).toHaveTextContent('Entrar');
  });

  it('renderiza com o estado de loading', () => {
    render(<CodeflixButton loading>Entrar</CodeflixButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Carregando...');
    expect(button).toBeDisabled();
  });

  it('renderiza com a prop disabled', () => {
    render(<CodeflixButton disabled>Entrar</CodeflixButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('dispara o evento onClick quando clicado', () => {
    const handleClick = jest.fn();
    render(<CodeflixButton onClick={handleClick}>Entrar</CodeflixButton>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('não dispara o onClick quando loading', () => {
    const handleClick = jest.fn();
    render(<CodeflixButton loading onClick={handleClick}>Entrar</CodeflixButton>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('aplica classes personalizadas corretamente', () => {
    render(<CodeflixButton className="custom-class">Entrar</CodeflixButton>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
