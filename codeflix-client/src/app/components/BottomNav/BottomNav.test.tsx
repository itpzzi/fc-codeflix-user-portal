import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BottomNav } from '@/components/BottomNav/BottomNav';
import { usePathname } from 'next/navigation';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const mockedUsePathname = usePathname as jest.Mock;

describe('BottomNav', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza todos os links de navegação com ícones', () => {
    mockedUsePathname.mockReturnValue('/home');

    render(<BottomNav />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(5);

    const labels = ['Home', 'Busca', 'Player', 'Perfil', 'Config'];
    labels.forEach((label) => {
      const link = screen.getByLabelText(label);
      expect(link).toBeInTheDocument();
    });
  });

  it('aplica classe ativa ao link da rota atual', () => {
    mockedUsePathname.mockReturnValue('/search');

    render(<BottomNav />);

    const activeLink = screen.getByLabelText('Busca');
    expect(activeLink).toHaveClass('scale-120');
    expect(activeLink).toHaveClass('bg-white/40');
  });

  it('não aplica classe ativa a links não selecionados', () => {
    mockedUsePathname.mockReturnValue('/player');

    render(<BottomNav />);

    const inactiveLabels = ['Home', 'Busca', 'Perfil', 'Config'];
    inactiveLabels.forEach((label) => {
      const link = screen.getByLabelText(label);
      expect(link).not.toHaveClass('scale-120');
      expect(link).not.toHaveClass('bg-white/40');
    });
  });
});
