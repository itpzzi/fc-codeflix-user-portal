import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CodeflixInput } from './CodeflixInput';
import '@testing-library/jest-dom';

describe('CodeflixInput', () => {
  it('renderiza com label', () => {
    render(<CodeflixInput id="email" label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('não renderiza label se não for fornecido', () => {
    render(<CodeflixInput id="sem-label" />);
    expect(screen.queryByLabelText(/.+/)).not.toBeInTheDocument();
  });

  it('renderiza com placeholder', () => {
    render(<CodeflixInput placeholder="Digite algo..." />);
    expect(screen.getByPlaceholderText('Digite algo...')).toBeInTheDocument();
  });

  it('dispara onChange corretamente', () => {
    const handleChange = jest.fn();
    render(<CodeflixInput onChange={handleChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'abc' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('aplica classe de erro quando hasError = true', () => {
    render(<CodeflixInput hasError />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-[var(--color-codeflix-red)]');
  });

  it('aplica classes personalizadas', () => {
    render(<CodeflixInput className="custom-class" />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });
});
