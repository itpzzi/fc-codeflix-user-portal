import React from 'react';
import { render, screen } from '@testing-library/react';
import { BottomNav } from './BottomNav';
import { usePathname } from 'next/navigation';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('@/components/SearchBar', () => ({
  SearchBar: () => <div>SearchBar</div>
}));

const mockedUsePathname = usePathname as jest.Mock;

describe('BottomNav', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza todos os itens de navegação com ícones', () => {
    mockedUsePathname.mockReturnValue('/home');

    render(<BottomNav />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);

    const labels = ['Home', 'Perfil', 'Config'];
    labels.forEach((label) => {
      const link = screen.getByLabelText(label);
      expect(link).toBeInTheDocument();
    });
  });

  it('aplica classe ativa ao link da rota atual', () => {
    mockedUsePathname.mockReturnValue('/profile');

    render(<BottomNav />);

    const activeLink = screen.getByLabelText('Perfil');
    expect(activeLink).toHaveClass('scale-110');
    expect(activeLink).toHaveClass('bg-white/40');
  });

  it('não aplica classe ativa a links não selecionados', () => {
    mockedUsePathname.mockReturnValue('/home');

    render(<BottomNav />);

    const inactiveLabels = ['Perfil', 'Config'];
    inactiveLabels.forEach((label) => {
      const link = screen.getByLabelText(label);
      expect(link).not.toHaveClass('scale-110');
      expect(link).not.toHaveClass('bg-white/40');
    });
  });
});
