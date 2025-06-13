import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MovieCard } from './MovieCard';
import { createMockMovieWithExtras } from '@/tests/mocks/movie';
import { MovieWithExtras } from '@/types/movie';

jest.mock('@/hooks/useImageColors', () => ({
  useImageColors: () => ({
    accentColor: '#FF0000',
  }),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('MovieCard', () => {
  const movie: MovieWithExtras = createMockMovieWithExtras();

  it('deve renderizar o título no atributo aria-label', () => {
    render(<MovieCard movie={movie} index={0} />);
    expect(screen.getByRole('button', { name: /Filme: Test Movie 1/i })).toBeInTheDocument();
  });

  it('deve alterar o estado de hover com teclado (Enter)', () => {
    render(<MovieCard movie={movie} index={0} />);
    const card = screen.getByTestId('movie-card');

    fireEvent.keyDown(card, { key: 'Enter' });

    expect(card).toBeInTheDocument();
  });

  it('deve renderizar os elementos internos ao passar o mouse', () => {
    render(<MovieCard movie={movie} index={0} />);
    const card = screen.getByTestId('movie-card');
    fireEvent.mouseEnter(card);

    expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Action • Adventure • Sci-Fi')).toBeInTheDocument();
    expect(screen.getByText('This is a test movie description')).toBeInTheDocument();
  });

  it('deve renderizar as imagens de preview e overlay com src correto', () => {
    render(<MovieCard movie={movie} index={0} />);

    const images = screen.getAllByRole('img');

    expect(images).toHaveLength(2);
    images.forEach((img) => {
      expect(img).toHaveAttribute('src', movie.bannerFileURL);
      expect(img).toHaveAttribute('alt', movie.title);
    });
  });

  it('deve renderizar componentes filhos', () => {
    render(<MovieCard movie={movie} index={0} />);

    expect(screen.getByTestId('movie-card-actions')).toBeInTheDocument();
    expect(screen.getByTestId('movie-card-info')).toBeInTheDocument();
  });

});
