
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FeaturedSection } from '@/components/FeaturedSection/FeaturedSection';
import { Movie } from '@/types/movie';


jest.mock('./BannerFeatured', () => ({
  BannerFeatured: ({ title }: any) => (
    <div data-testid="banner-featured">Banner: {title}</div>
  ),
}));

jest.mock('./SlideFeatured', () => ({
  SlideFeatured: ({ movies, onSelect, selectedMovie }: any) => (
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
  {
    id: 1,
    title: 'Test Movie',
    description: 'This is a test movie description',
    yearLaunched: '2023',
    link: '/watch/test-movie',
    castMembers: ['Actor1', 'Actor2'],
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    thumbFileURL: '/test-thumb.jpg',
    bannerFileURL: '/test-banner.jpg',
    videoFileURL: '/test-video.mp4',
    rating: 'L'
  },
  {
    id: 2,
    title: 'Test Movie 2',
    description: 'This is a test movie description',
    yearLaunched: '2025',
    link: '/watch/test-movie',
    castMembers: ['Actor3', 'Actor4'],
    genres: ['Drama', 'Suspense'],
    thumbFileURL: '/test-thumb.jpg',
    bannerFileURL: '/test-banner.jpg',
    videoFileURL: '/test-video.mp4',
    rating: 'L'
  },
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
