import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MovieCardInfo } from './MovieCardInfo';

describe('MovieCardInfo', () => {
  const defaultProps = {
    title: 'Filme Exemplo',
    genres: ['Ação', 'Aventura'],
    description: 'Um filme de teste com bastante ação.',
    rating: '16',
    duration: 95,
    quality: 'HD',
    matchPercentage: 72,
  };

  it('deve renderizar título, gêneros e descrição', () => {
    render(<MovieCardInfo {...defaultProps} />);
    
    expect(screen.getByText('Filme Exemplo')).toBeInTheDocument();
    expect(screen.getByText('Ação • Aventura')).toBeInTheDocument();
    expect(screen.getByText('Um filme de teste com bastante ação.')).toBeInTheDocument();
  });

  it('deve exibir rating, duração formatada e qualidade', () => {
    render(<MovieCardInfo {...defaultProps} />);
    
    expect(screen.getByText('16')).toBeInTheDocument();
    expect(screen.getByText('1h 35m')).toBeInTheDocument();
    expect(screen.getByText('HD')).toBeInTheDocument();
  });

  it('deve exibir matchPercentage com cor correspondente', () => {
    render(<MovieCardInfo {...defaultProps} />);
    
    const matchElement = screen.getByText('Match 72%');
    expect(matchElement).toBeInTheDocument();
    expect(matchElement).toHaveStyle({ color: '#6BCB77' }); // verde
  });
});
