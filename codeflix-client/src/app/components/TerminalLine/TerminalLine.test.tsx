import React from 'react';
import { render, screen } from '@testing-library/react';
import { TerminalLine } from './TerminalLine';
import '@testing-library/jest-dom';

describe('TerminalLine', () => {
  it('renderiza prompt com emoji e texto', () => {
    render(
      <TerminalLine
        prompt="🗄️"
        text='BANCO: "Verifiquei meus índices... esse título nunca passou por aqui."'
      />
    );

    expect(screen.getByText('🗄️')).toBeInTheDocument();
    expect(
      screen.getByText('BANCO: "Verifiquei meus índices... esse título nunca passou por aqui."')
    ).toBeInTheDocument();
  });

  it('usa cor padrão se nenhuma for fornecida', () => {
    render(
      <TerminalLine
        prompt="🗄️"
        text="BANCO: mensagem de erro"
      />
    );
    const textElement = screen.getByText('BANCO: mensagem de erro');
    expect(textElement).toHaveClass('text-gray-300');
  });

  it('aplica classe de cor customizada', () => {
    render(
      <TerminalLine
        prompt="🗄️"
        text="BANCO: erro crítico"
        color="text-red-400"
      />
    );
    const textElement = screen.getByText('BANCO: erro crítico');
    expect(textElement).toHaveClass('text-red-400');
  });

  it('mantém layout com quebra de linha ativada', () => {
    const longText =
      'BANCO: "Essa é uma mensagem muito longa para testar se a quebra de palavras funciona corretamente no layout do terminal."';

    render(<TerminalLine prompt="🗄️" text={longText} />);
    const textElement = screen.getByText(longText);
    expect(textElement).toHaveClass('break-words');
  });
});
