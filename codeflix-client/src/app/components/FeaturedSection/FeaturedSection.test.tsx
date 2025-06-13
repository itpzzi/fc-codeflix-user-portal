
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FeaturedSection } from '@/components/FeaturedSection/FeaturedSection';
import { Movie } from '@/types/movie';
import { createMockMovie } from '@/tests/mocks/movie';
import { BannerFeaturedProps } from '@/components/FeaturedSection/BannerFeatured';
import { SlideFeaturedProps } from '@/components/FeaturedSection/SlideFeatured';


jest.mock('./BannerFeatured', () => ({
  BannerFeatured: ({ title }: BannerFeaturedProps) => (
    <div data-testid="banner-featured">Banner: {title}</div>
  ),
}));

jest.mock('./SlideFeatured', () => ({
  SlideFeatured: ({ movies, onSelect, selectedMovie }: SlideFeaturedProps) => (
    <div data-testid="slide-featured">
      {movies.map((movie: Movie) => (
        <button
          key={movie.id}
          onClick={() => onSelect(movie)}
          data-testid={`movie-${movie.id}`}
          className={selectedMovie?.id === movie.id ? 'selected' : ''}
        >
          {movie.title}
        </button>
      ))}
    </div>
  ),
}));

const mockMovies: Movie[] = [
  createMockMovie(),
  createMockMovie(
    {
      id: 2,
      title: 'Test Movie 2',
      yearLaunched: '2025',
      castMembers: ['Actor3', 'Actor4'],
      link: '/watch/2',
    }
  )
];

describe('FeaturedSection', () => {
  it('deve renderizar com o texto "Trending now"', () => {
    render(<FeaturedSection movies={mockMovies} />);

    expect(screen.getByText('Trending now')).toBeInTheDocument();
  });

  it('deve selecionar o filme quando clicado', () => {
    render(<FeaturedSection movies={mockMovies} />);

    const movie2Button = screen.getByTestId('movie-2');
    fireEvent.click(movie2Button);

    expect(screen.getByTestId('banner-featured')).toHaveTextContent('Banner: Test Movie 2');
    expect(movie2Button).toHaveClass('selected');
  });

  it('deve renderizar o banner e a seção de filmes', () => {
    render(<FeaturedSection movies={mockMovies} />);

    expect(screen.getByTestId('banner-featured')).toBeInTheDocument();
    expect(screen.getByTestId('slide-featured')).toBeInTheDocument();
  });
});
